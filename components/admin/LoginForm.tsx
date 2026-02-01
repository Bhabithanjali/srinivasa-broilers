import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(password);
    setIsLoading(false);
    if (success) {
      onClose();
      navigate('/admin'); // Redirect to admin dashboard on successful login
    } else {
      setError('Invalid password');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admin Login">
      <form onSubmit={handleSubmit}>
        <Input
          id="admin-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          required
        />
        <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </Modal>
  );
};
