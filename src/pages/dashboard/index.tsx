'use client';

import copy from 'copy-to-clipboard';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import { getRecentHistory } from '@/services/history/historyService';
import { setRecentHistory } from '@/stores/history.store';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

import type { ToastMessage } from 'primereact/toast';
import { Toast } from 'primereact/toast';

import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalBody from '@/components/Modal/ModalBody/ModalBody';
import ModalFooter from '@/components/Modal/ModalFooter/ModalFooter';
import ModalHeader from '@/components/Modal/ModalHeader/ModalHeader';

import Panel from '@/components/Panel/Panel';
import { Table } from '@/components/Table/Table';
import { TableColumn } from '@/components/Table/table.types';

import { useModalStore } from '@/stores/modal.store';
import { Chart } from 'primereact/chart';

type HistoryItem = {
  email: string;
  loginAt: string;
  jwe: string;
};

export default function DashboardIndex() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.history.recent);

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
    getRecentHistory().then((res) => dispatch(setRecentHistory(res)));
  }, [dispatch]);

  const chartOptions = {
    labels: ['7 dias atrás', '6', '5', '4', '3', '2', 'Ontem'],
    datasets: [{ label: 'Logins', data: [2, 5, 3, 4, 7, 6, 9] }],
  };

  const chartMonthOptions = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [{ label: 'Logins', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)) }],
  };

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
        <title>Dashboard | Claro Dashboard</title>
        <meta name="description" content="Painel com estatísticas e histórico recente de login" />
      </Head>

      <DashboardLayout>
        <Toast ref={toast} />

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <i className="pi pi-home text-3xl text-primary-400" />
          Dashboard
        </h1>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex-1 min-w-0">
            <Chart
              type="line"
              data={chartOptions}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Chart
              type="bar"
              data={chartMonthOptions}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <Panel title="HISTÓRICO RECENTE" iconBeforeTitle={<i className="pi pi-clock" />}>
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
