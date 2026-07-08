import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardBody } from '../components/ui/Card';
import SearchBox from '../components/ui/SearchBox';
import FilterPanel from '../components/ui/FilterPanel';
import DataTable from '../components/tables/DataTable';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import Drawer from '../components/ui/Drawer';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import useListPageUI from '../hooks/useListPageUI';

export default function ListPageTemplate({
  title, subtitle, addLabel, stats = [], columns, data, filters,
  formFields, detailFields,
}) {
  const { modalOpen, setModalOpen, drawerOpen, setDrawerOpen, selected, openAdd, openEdit, openView } = useListPageUI();

  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} addLabel={addLabel} onAdd={openAdd} />

      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => <StatCard key={s.title} {...s} />)}
        </div>
      )}

      <Card>
        <CardBody>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <SearchBox placeholder={`Search ${title.toLowerCase()}...`} className="flex-1" />
          </div>
          {filters && <FilterPanel filters={filters} className="mb-6" />}
          <DataTable columns={columns} data={data} onView={openView} onEdit={openEdit} onDelete={() => {}} />
          <Pagination current={1} total={3} />
        </CardBody>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selected ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((f) =>
            f.type === 'select' ? <Select key={f.name} label={f.label} options={f.options} defaultValue={selected?.[f.name] || ''} />
            : f.type === 'textarea' ? <Textarea key={f.name} label={f.label} className="md:col-span-2" defaultValue={selected?.[f.name] || ''} />
            : <Input key={f.name} label={f.label} type={f.type || 'text'} defaultValue={selected?.[f.name] || ''} />
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>{selected ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Details">
        {selected && (
          <div className="space-y-4">
            {detailFields.map((f) => (
              <div key={f.key} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider">{f.label}</p>
                <p className="text-sm font-medium mt-1">{selected[f.key]}</p>
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={() => { setDrawerOpen(false); openEdit(selected); }}>Edit</Button>
              <Button variant="danger" className="flex-1">Delete</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}