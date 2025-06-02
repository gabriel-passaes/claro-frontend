'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import AuthLayout from '@/layouts/AuthLayout';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import { login } from '@/services/auth/authService';
import { setToken } from '@/stores/auth.store';
import { useAppDispatch } from '@/stores/hooks';
import { useInputField, useInputStore } from '@/stores/input.store';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    severity: 'warn' | 'info' | 'error';
    text: string;
  } | null>(null);

  const [receivedToken, setReceivedToken] = useState<string | null>(null);

  const { value: email, setValue: setEmail } = useInputField('email');
  const { value: password, setValue: setPassword } = useInputField('password');

  useEffect(() => {
    const { initField } = useInputStore.getState();
    initField('email');
    initField('password');
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAlertMessage(null);
    setReceivedToken(null);

    if (!email || !password) {
      setAlertMessage({
        severity: 'warn',
        text: 'Todos os Campos Precisam Estar Preenchidos',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });
      const token = response.token;

      dispatch(setToken(token));
      document.cookie = `token=${token}; path=/`;

      setReceivedToken(token);
      setEmail('');
      setPassword('');

      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Login Realizado! Redirecionando...',
        life: 3000,
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 3200);
    } catch {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha No Login, Verifique Seus Dados',
        life: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Claro Dashboard</title>
        <meta name="description" content="Área de acesso ao painel Claro" />
      </Head>

      <AuthLayout>
        <Toast ref={toast} />

        <div className="w-full max-w-md bg-light-100 dark:bg-dark-100 rounded-xl shadow-xl p-6 transition-all duration-300 border border-gray-200 dark:border-neutral-700">
          <div className="flex justify-center mb-5">
            <Image
              src="/logo-claro.svg"
              alt="Logo Claro"
              width={80}
              height={80}
              priority
            />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            {receivedToken && (
              <Message
                severity="info"
                text={`Token: ${receivedToken}`}
                style={{ wordBreak: 'break-word' }}
              />
            )}

            {alertMessage && (
              <Message
                severity={alertMessage.severity}
                text={alertMessage.text}
              />
            )}

            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
              iconRight="pi pi-envelope"
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={setPassword}
              iconRight="pi pi-lock"
            />

            <Button
              label="Entrar"
              type="submit"
              loading={loading}
              iconBefore={<i className="pi pi-sign-in" />}
              loadingProps={{ type: 'spin', size: 'small', color: 'light' }}
              className="w-full"
            />
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
