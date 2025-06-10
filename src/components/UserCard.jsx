import { GoGift } from 'react-icons/go';
import { formatDate } from '../lib/utils';
import './UserCard.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function UserCard({ user, onEdit, onDelete }) {
	return (
		<div className="card">
			{user.image_url && (
				<img
					className="imgUser"
					src={user.image_url}
					alt={user.first_name}
					width={85}
					height={85}
				/>
			)}

			<h2 className="names">
				{user.first_name} {user.last_name}
			</h2>
			<p className="email">{user.email}</p>
			<p className="birthday">
				{' '}
				<GoGift /> {formatDate(user.birthday)}
			</p>

			<div>
				<button className="btn__edit" onClick={() => onEdit(user)}>
					{' '}
					<FiEdit />
				</button>

				<button
					className="btn__delete"
					onClick={() => onDelete(user)}
					style={{ marginLeft: 10 }}
				>
					<FiTrash2 />
				</button>
			</div>
		</div>
	);
}
export default UserCard;
