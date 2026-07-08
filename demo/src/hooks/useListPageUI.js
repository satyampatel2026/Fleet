import { useState } from 'react';

export default function useListPageUI() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return {
    modalOpen, setModalOpen,
    drawerOpen, setDrawerOpen,
    selected, setSelected,
    openAdd: () => { setSelected(null); setModalOpen(true); },
    openEdit: (row) => { setSelected(row); setModalOpen(true); },
    openView: (row) => { setSelected(row); setDrawerOpen(true); },
  };
}