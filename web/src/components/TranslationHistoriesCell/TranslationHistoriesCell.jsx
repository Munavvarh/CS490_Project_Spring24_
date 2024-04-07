// Import necessary dependencies from RedwoodJS
import { Link, routes } from '@redwoodjs/router'
//import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth';
import React, { useState } from 'react';

export const QUERY = gql`
  query FindTranslationHistoriesQuery {
    translationHistories {
      id
      userId
      originalCode
      translatedCode
      createdAt
      updatedAt
      originalLanguage
      translationLanguage
      status
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No translation histories found.</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error loading translation histories: {error.message}</div>
)

export const Success = ({ translationHistories }) => {
  const { currentUser } = useAuth(); // Use the useAuth hook to get the current user
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTranslationHistories = [...translationHistories].sort((a, b) => {
    if (!sortColumn) return 0;
    let isReversed = sortDirection === 'asc' ? 1 : -1;
    switch (sortColumn) {
      case 'createdAt':
      case 'updatedAt':
        return isReversed * (new Date(a[sortColumn]) - new Date(b[sortColumn]));
      case 'originalLanguage':
      case 'translationLanguage':
        return isReversed * a[sortColumn].localeCompare(b[sortColumn]);
      default:
        return 0;
    }
  }).filter(history => history.userId === currentUser?.id);

  const styles = {
    table: {
      width: '100%',
      marginBottom: '1rem',
      color: '#212529',
      backgroundColor: '#e3f2fd', // Light blue background for the table
      borderCollapse: 'collapse', // Ensures borders collapse into a single border
    },
    th: {
      cursor: 'pointer',
      verticalAlign: 'bottom',
      borderBottom: '2px solid #007bff', // Blue border for table headers
      borderRight: '1px solid #007bff', // Vertical borders
      textAlign: 'center', // Center align header text
      padding: '8px', // Padding for spacing
    },
    td: {
      verticalAlign: 'top',
      borderBottom: '1px solid #dee2e6',
      borderRight: '1px solid #dee2e6', // Vertical borders
      textAlign: 'center', // Center align cell text
      padding: '8px', // Padding for spacing
    },
    link: {
      color: '#007bff', // Blue color for links
      textDecoration: 'none',
      backgroundColor: 'transparent',
    },
    button: {
      color: '#fff', // White text for buttons
      backgroundColor: '#007bff', // Blue background for buttons
      borderColor: '#007bff',
      padding: '.375rem .75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '.25rem',
      cursor: 'pointer',
      border: '1px solid transparent',
      display: 'inline-block',
      fontWeight: '400',
      textAlign: 'center',
      userSelect: 'none',
      transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
    },
  };

  // Ensure the last <th> and <td> in each row don't have a right border
  const lastChildStyle = {
    borderRight: 'none',
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Original Code</th>
            <th style={styles.th}>Translated Code</th>
            <th style={styles.th} onClick={() => toggleSort('createdAt')}>Translated On</th>
            <th style={styles.th} onClick={() => toggleSort('updatedAt')}>Last Updated</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th} onClick={() => toggleSort('originalLanguage')}>Original Language</th>
            <th style={styles.th} onClick={() => toggleSort('translationLanguage')}>Translation Language</th>
            <th style={{ ...styles.th, ...lastChildStyle }}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sortedTranslationHistories.length > 0 ? sortedTranslationHistories.map((history) => (
            <tr key={history.id}>
              <td style={styles.td}>{history.originalCode}</td>
              <td style={styles.td}>{history.translatedCode}</td>
              <td style={styles.td}>{new Date(history.createdAt).toLocaleDateString()}</td>
              <td style={styles.td}>{new Date(history.updatedAt).toLocaleDateString()}</td>
              <td style={styles.td}>{history.status}</td>
              <td style={styles.td}>{history.originalLanguage}</td>
              <td style={styles.td}>{history.translationLanguage}</td>
              <td style={{ ...styles.td, ...lastChildStyle }}>
                <nav className="rw-table-actions">
                  <Link
                    to={`${routes.translationOutput()}?originalCode=${encodeURIComponent(history.originalCode)}`}
                    title={'Show translation history ' + history.id + ' detail'}
                    style={styles.link}
                  >
                    <button style={styles.button}>Change</button>
                  </Link>
                </nav>
              </td>
            </tr>
          )) : <tr><td style={{ textAlign: 'center', padding: '20px' }} colSpan="8">No translation histories found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};
