import React, {useState} from 'react';
import {DB} from '../lib/db';

type DBContextType = {
  db: DB;
};

const DBContext = React.createContext<DBContextType | undefined>(undefined);

function useDB(): DBContextType {
  const context = React.useContext(DBContext);
  if (!context) {
    throw new Error('useStore must be used within an DBProvider');
  }
  return context;
}

const DBProvider = (props: {children: React.ReactNode}): React.ReactElement => {
  const [db] = useState<DB>(new DB());
  return <DBContext.Provider {...props} value={{db}} />;
};

export {DBProvider, useDB};
