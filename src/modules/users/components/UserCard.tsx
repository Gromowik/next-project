import type { User } from '../model/types';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
        {user.role}
      </span>
    </div>
  );
}
