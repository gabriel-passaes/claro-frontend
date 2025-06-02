'use client';

import copy from 'copy-to-clipboard';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { getAllHistory } from '@/services/history/historyService';
import { setAllHistory } from '@/stores/history.store';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

import Panel from '@/components/Panel/Panel';
import { Table } from '@/components/Table/Table';
import { TableColumn } from '@/components/Table/table.types';

import Button from '@/components/Button/Button';
import type { ToastMessage } from 'primereact/toast';
import { Toast } from 'primereact/toast';

import Modal from '@/components/Modal/Modal';
import ModalBody from '@/components/Modal/ModalBody/ModalBody';
import ModalFooter from '@/components/Modal/ModalFooter/ModalFooter';
import ModalHeader from '@/components/Modal/ModalHeader/ModalHeader';
import { useModalStore } from '@/stores/modal.store';

type HistoryItem = {
  email: string;
  loginAt: string;
  jwe: string;
};

export default function HistoryPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.history.all);

  const [selectedJwe, setSelectedJwe] = useState('');
  const [page, setPage] = useState(1);
  const toast = useRef<Toast>(null);
  const itemsPerPage = 5;

  const { isOpen, openModal, closeModal } = useModalStore();

  const handleOpenModal = (jwe: string) => {
    setSelectedJwe(jwe);
    openModal();
  };

  const copyJwe = () => {
    copy(selectedJwe);
    const message: ToastMessage = {
      severity: 'success',
      summary: 'Copiado',
      detail: 'Token Copiado Para a Área de Transferência',
    };
    toast.current?.show(message);
  };

  useEffect(() => {
    getAllHistory().then((res) => dispatch(setAllHistory(res)));
  }, [dispatch]);

  const columns: TableColumn<HistoryItem>[] = [
    { field: 'email', header: 'Email' },
    {
      field: 'loginAt',
      header: 'Login',
      body: (row) =>
        new Date(row.loginAt).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
    },
  ];

  return (
    <>
      <Head>
        <title>Histórico de Logins | Claro Dashboard</title>
        <meta name="description" content="Visualize o histórico de logins no sistema" />
      </Head>

      <DashboardLayout>
        <Toast ref={toast} />

        <Panel title="HISTÓRICO DE LOGIN" iconBeforeTitle={<i className="pi pi-list" />}>
          <div className="px-3 pb-3 pt-2">
            <Table<HistoryItem>
              data={data}
              columns={columns}
              zebra
              currentPage={page}
              onPageChange={setPage}
              rowsPerPage={itemsPerPage}
              actions={(row) => [
                <Button
                  key="view"
                  iconBefore={<i className="pi pi-eye" />}
                  color="transparent"
                  textColor="primary-400"
                  onClick={() => handleOpenModal(row.jwe)}
                  aria-label="Visualizar token"
                />,
              ]}
            />
          </div>
        </Panel>

        {isOpen && (
          <Modal>
            <ModalHeader
              title="Token JWE"
              background="primary"
              icon={<i className="pi pi-key" />}
              onClose={closeModal}
            />
            <ModalBody type="content">
              <div className="max-h-[60vh] overflow-y-auto">
                <p className="break-words text-sm text-dark-100 dark:text-light-100">
                  {selectedJwe}
                </p>
              </div>
            </ModalBody>
            <ModalFooter
              buttons={[
                {
                  label: 'Copiar',
                  iconBefore: <i className="pi pi-copy" />,
                  color: 'primary',
                  onClick: copyJwe,
                },
              ]}
            />
          </Modal>
        )}
      </DashboardLayout>
    </>
  );
}
