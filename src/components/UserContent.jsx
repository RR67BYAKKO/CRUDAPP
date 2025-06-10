import UserCard from './UserCard';
import './UserContent.css';

function UserContent({ users, onEdit, onDelete }) {
	return (
		<>
			<div className="content">
				{users.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			</div>

			{users.length === 0 && <p>No users found</p>}
		</>
	);
}
export default UserContent;
