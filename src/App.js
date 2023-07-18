import './App.css';
import { JsonPlaceholder } from './componennts/jsonplaceholder/jsonPlaceholder';
import { JsonServer } from './componennts/json-server/json-server';
import { Firebase } from './componennts/fairbase/fairbase';
import { useState } from 'react';

export const App = () => {
	const [showJsonPlaceholder, setShowJsonPlaceholder] = useState(true);
	const [showJsonServer, setShowJsonServer] = useState(false);
	const [showFirebase, setShowFirebase] = useState(false);

	const handleJsonPlaceholder = () => {
		setShowJsonPlaceholder(true);
		setShowJsonServer(false);
		setShowFirebase(false);
	};

	const handleJsonServer = () => {
		setShowJsonPlaceholder(false);
		setShowJsonServer(true);
		setShowFirebase(false);
	}

	const handleFirebase = () => {
		setShowJsonPlaceholder(false);
		setShowJsonServer(false);
		setShowFirebase(true);
	}

	return (
		<div>
			<span className="JsonPlaceholder" onClick={handleJsonPlaceholder}>
				JsonPlaceholder
			</span>
			<span className="JsonServer" onClick={handleJsonServer}>
				JsonServer
			</span>
			<span className="Firebase" onClick={handleFirebase}>
				Firebase
			</span>
			{showJsonPlaceholder  && <JsonPlaceholder />}
			{showJsonServer  && <JsonServer />}
			{showFirebase  && <Firebase />}
		</div>
	);
};
