import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, saveToken, isAuthenticated } from '../../services/auth';
import type { LoginRequest } from '../../types/auth';
import './Login.scss';

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/board', { replace: true });
    }
    emailRef.current?.focus();
  }, [navigate]);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!form.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await login(form);
      saveToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/board', { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setApiError(err.response.data.error);
      } else if (axios.isAxiosError(err) && err.response?.status === 401) {
        setApiError('E-mail ou senha inválidos');
      } else {
        setApiError('Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page" role="main">
      <div className="login-card" aria-label="Formulário de login">
        <div className="login-logo">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="var(--blue)" />
            <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
            <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
          </svg>
          <span className="login-logo-name">FusionRun</span>
        </div>

        <h1 className="login-title">Entrar na sua conta</h1>
        <p className="login-subtitle">Bem-vindo de volta!</p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
          aria-label="Login"
          noValidate
        >
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              E-mail
            </label>
            <input
              id="email"
              ref={emailRef}
              name="email"
              type="email"
              className={`login-input${errors.email ? ' login-input--error' : ''}`}
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              disabled={isLoading}
            />
            {errors.email && (
              <span id="email-error" className="login-field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`login-input${errors.password ? ' login-input--error' : ''}`}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
              disabled={isLoading}
            />
            {errors.password && (
              <span id="password-error" className="login-field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {apiError && (
            <div className="login-api-error" role="alert" aria-live="assertive">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
