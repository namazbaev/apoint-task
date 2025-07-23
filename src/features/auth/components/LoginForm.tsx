import React from 'react';
import { useLoginForm } from '../hooks';
import { Button, Input } from '~/shared/components/ui';

export const LoginForm: React.FC = () => {
  const {
    credentials,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
    isLoggingIn,
    loginError,
  } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-950">
            Welcome to APOINT
          </h1>
          <p className="text-sm text-neutral-600 mt-2">
            Please log in to continue
          </p>
        </div>

        {loginError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {loginError.message || 'Login failed. Please try again.'}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="username"
            label="Username"
            autoComplete="username"
            error={errors.username}
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />

          <Input
            name="password"
            type="password"
            label="Password"
            showPasswordToggle
            error={errors.password}
            value={credentials.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoggingIn || !isFormValid}
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};
