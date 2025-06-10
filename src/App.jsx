import { useEffect, useState } from 'react';
import './App.css';
import UserContent from './components/UserContent';
import { useCrud } from './hooks/useCrud';
import Modal from './components/Modal';
import Form from './components/Form';
import useModal from './hooks/useModal';

const baseUrl =
	'https://users-crud-api-production-9c59.up.railway.app/api/v1/users';

function App() {
	const [
		{ results: users },
		loading,
		error,
		{ getAll, create, update, remove },
	] = useCrud(baseUrl);

	const { isOpen, openModal, closeModal, modalContent, setModalContent } =
		useModal();
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		getAll();
	}, []);

	const handleCreate = (dataForm) => {
		create(dataForm);
		closeModal();
	};

	const handleAdd = () => {
		openModal();
		setModalContent(<Form onSubmit={handleCreate} />);
	};

	const handleDelete = (user) => {
		const confrimDelete = window.confirm(
			`Are you sure you want to delete ${user.first_name}${user.last_name}?`,
		);
		if (confrimDelete) {
			remove(user.id);
		}
	};

	const handleCancel = () => {
		setSelectedUser(null);
		closeModal();
	};

	const handleUpdate = (dataForm) => {
		update(dataForm.id, dataForm);
		setSelectedUser(null);
		closeModal();
	};

	const handleEdit = (user) => {
		setSelectedUser(user);
		openModal();
		setModalContent(
			<Form onSubmit={handleUpdate} onCancel={handleCancel} user={user} />,
		);
	};

	return (
		<div className="App">
			<div className="header">
				<h1 className="title">CRUD Users</h1>

				<button onClick={handleAdd} className="btn__primary">
					Add User
				</button>
			</div>

			{/* error message */}
			{error && <p className="errors">{error}</p>}

			{/* user list */}
			{loading ? (
				<p>Loading...</p>
			) : (
				users && (
					<UserContent
						users={users}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)
			)}

			{/* Modal*/}
			<Modal openModal={isOpen} closeModal={closeModal}>
				{modalContent}
			</Modal>
		</div>
	);
}

export default App;
