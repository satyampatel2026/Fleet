import { FiFileText, FiCheckCircle, FiAlertTriangle, FiUpload } from 'react-icons/fi';
import ListPageTemplate from "../ListPageTemplate";
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { documents } from '../../utils/staticData';

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <ListPageTemplate
        title="Documents"
        subtitle="Vehicle and driver documents with expiry alerts"
        addLabel="Upload Document"
        stats={[
          { title: 'Total Documents', value: 486, icon: FiFileText, color: 'brand' },
          { title: 'Valid', value: 412, icon: FiCheckCircle, color: 'emerald' },
          { title: 'Expiring Soon', value: 38, icon: FiAlertTriangle, color: 'amber' },
          { title: 'Expired', value: 12, icon: FiAlertTriangle, color: 'rose' },
        ]}
        columns={[
          { key: 'name', label: 'Document' },
          { key: 'type', label: 'Type' },
          { key: 'entity', label: 'Entity' },
          { key: 'expiry', label: 'Expiry Date' },
          { key: 'status', label: 'Status' },
        ]}
        data={documents}
        filters={[
          { label: 'Type', options: [{ value: '', label: 'All' }, { value: 'Insurance', label: 'Insurance' }, { value: 'License', label: 'License' }, { value: 'PUC', label: 'PUC' }] },
          { label: 'Entity', options: [{ value: '', label: 'All' }, { value: 'Vehicle', label: 'Vehicle' }, { value: 'Driver', label: 'Driver' }] },
        ]}
        formFields={[
          { name: 'name', label: 'Document Name' },
          { name: 'type', label: 'Document Type', type: 'select', options: [{ value: 'Insurance', label: 'Insurance' }, { value: 'License', label: 'License' }, { value: 'PUC', label: 'PUC' }, { value: 'Fitness', label: 'Fitness' }, { value: 'RC', label: 'RC' }] },
          { name: 'entity', label: 'Entity Type', type: 'select', options: [{ value: 'Vehicle', label: 'Vehicle' }, { value: 'Driver', label: 'Driver' }] },
          { name: 'expiry', label: 'Expiry Date', type: 'date' },
        ]}
        detailFields={[
          { key: 'name', label: 'Document' },
          { key: 'type', label: 'Type' },
          { key: 'entity', label: 'Entity' },
          { key: 'expiry', label: 'Expiry' },
          { key: 'status', label: 'Status' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Upload Document" subtitle="Drag and drop or browse files" />
          <CardBody>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center hover:border-brand-400 transition-colors cursor-pointer">
              <FiUpload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="font-medium">Drop files here or click to browse</p>
              <p className="text-sm text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
              <Button className="mt-4" variant="secondary">Choose File</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Expiry Alerts" subtitle="Documents requiring attention" />
          <CardBody className="space-y-3">
            {documents.filter(d => d.status !== 'Valid').map((d) => (
              <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-slate-500">Expires {d.expiry}</p>
                </div>
                <Badge status={d.status} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}