import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

export function useCrud(url) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const api = useRef(axios.create({ baseURL: url }));

	const getAll = useCallback(async () => {
		try {
			const res = await api.current.get('/');
			setData(res.data);
		} catch (error) {
			const errorMesage = error.response?.data?.message || 'Error getting data';
			setError(errorMesage);
			console.error('[Error GetAll]: ', error.message);
		}
	}, []);

	const create = useCallback(async (item) => {
		try {
			const res = await api.current.post('/', item);
			const newItem = res.data;
			setData((prev) => [...prev, newItem]);
		} catch (error) {
			const errorMesage =
				error.response?.data?.message || 'Error creating data';
			setError(errorMesage);
			console.error('[Error Create]: ', error.message);
		}
	}, []);

	const update = useCallback(async (item, id) => {
		try {
			const res = await api.current.put(`/${id}/`, item);
			const itemEdited = res.data;
			setData((prev) =>
				prev.map((item) => {
					if (item.id === id) {
						return itemEdited;
					} else {
						return item;
					}
				}),
			);
		} catch (error) {
			const errorMesage =
				error.response?.data?.message || 'Error updating data';
			setError(errorMesage);
			console.error('[Error Update]: ', error.message);
		}
	}, []);

	const remove = useCallback(async (id) => {
		try {
			await api.current.delete(`/${id}`);
			const deletedItem = (item) => item.id !== id;
			setData((prev) => prev.filter(deletedItem));
		} catch (error) {
			const errorMesage =
				error.response?.data?.message || 'Error deleting data';
			setError(errorMesage);
			console.error('[Error Delete]: ', error.message);
		}
	}, []);

	return [data, loading, error, { getAll, create, update, remove }];
}
