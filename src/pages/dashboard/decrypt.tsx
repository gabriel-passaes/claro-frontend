'use client';

import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Panel from '@/components/Panel/Panel';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Toast } from 'primereact/toast';

import { decryptToken } from '@/services/decrypt/decryptService';
import { useInputField, useInputStore } from '@/stores/input.store';

interface DecryptedUser {
  id: string;
  email: string;
  loginAt: string;
}

export default function DecryptPage() {
  const [user, setUser] = useState<DecryptedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const { value: token, setValue: setToken } = useInputField('token');

  useEffect(() => {
    useInputStore.getState().initField('token');
  }, []);

  const handleDecrypt = async () => {
    if (token.length < 256) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Token Muito Curto',
        detail: 'O Token Deve Ter No Mínimo 256 Caracteres',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await decryptToken(token);
      setUser(response);
      setToken('');

      toast.current?.show({
        severity: 'success',
        summary: 'Token Válido',
        detail: 'Token Decodificado Com Sucesso',
      });
    } catch {
      setUser(null);
      toast.current?.show({
        severity: 'error',
        summary: 'Token Inválido',
        detail: 'Não Foi Possível Decodificar o Token',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Decryptar Token | Claro Dashboard</title>
        <meta
          name="description"
          content="Decrypt JWE token e visualize os dados contidos"
        />
      </Head>

      <DashboardLayout>
        <Toast ref={toast} />

        <Panel title="DECRYPTAR TOKEN" iconBeforeTitle={<i className="pi pi-lock-open" />}>
          <div className="p-4 space-y-4">
            <Input
              name="token"
              label="Token JWE"
              placeholder="Cole Aqui o Token Completo"
              required
              minLength={256}
              maxLength={1024}
              value={token}
              onChange={setToken}
              type="text"
              iconRight="pi pi-key"
            />

            <div className="flex justify-end">
              <Button
                label="Decryptar"
                onClick={handleDecrypt}
                loading={loading}
                loadingProps={{ type: 'spin', size: 'small', color: 'light' }}
                iconBefore={<i className="pi pi-lock-open" />}
              />
            </div>

            {user && (
              <div className="mt-6 border border-gray-200 dark:border-neutral-700 rounded-md p-4 bg-surface-light-100 dark:bg-surface-dark-100 text-sm">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Login:</strong>{' '}
                  {new Date(user.loginAt).toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                  })}
                </p>
              </div>
            )}
          </div>
        </Panel>
      </DashboardLayout>
    </>
  );
}
