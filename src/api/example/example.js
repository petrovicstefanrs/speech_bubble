import firebase from 'firebase/app';
import 'firebase/firestore';

import {firebaseDb} from '../../firebase';

export const exampleRef = firebaseDb.collection('example');

export const getExample = () => {
	return exampleRef.get();
};

export const getExampleByUser = userId => {
	return exampleRef.where('uid', '==', userId).get();
};

export const getExampleById = exampleId => {
	return exampleRef.doc(exampleId).get();
};

export const createExample = payload => {
	const preparedPayload = Object.assign({}, payload, {
		created_at: firebase.firestore.FieldValue.serverTimestamp(),
		updated_at: firebase.firestore.FieldValue.serverTimestamp(),
	});
	return exampleRef.add(preparedPayload);
};

export const updateExample = (example, payload) => {
	const preparedPayload = Object.assign({}, payload, {
		updated_at: firebase.firestore.FieldValue.serverTimestamp(),
	});
	return exampleRef.doc(example).update(preparedPayload);
};

export const deleteExample = example => {
	return exampleRef.doc(example).delete();
};
