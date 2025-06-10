import { useState } from 'react';

export default function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return { isOpen, openModal, closeModal, modalContent, setModalContent };
}
