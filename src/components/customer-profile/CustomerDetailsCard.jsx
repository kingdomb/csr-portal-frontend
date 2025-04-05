// CustomerDetailsCard.jsx
import Card from '../common/Card';

export default function CustomerDetailsCard({ customer }) {
  if (!customer) return null;

  return (
    <Card className='mb-6'>
      <h3 className='text-lg font-medium mb-4'>Customer Details</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Object.keys(customer).map((key) => (
          <div key={key}>
            <p className='text-sm text-gray-400'>{key}</p>
            <p className='text-white'>{customer[key]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
