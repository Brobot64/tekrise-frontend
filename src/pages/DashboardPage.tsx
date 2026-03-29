import React, { useState, useEffect } from 'react';
import type { Service } from '../types';
import Button from '../components/Button';
import { Search, Plus, Briefcase, User as UserIcon, X } from 'lucide-react';
import Input from '../components/Input';
import * as apiService from '../services/apiService';

const DashboardPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ title: '', description: '' });
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServices();
      setServices(data);
      setLoading(false);
    } catch (err: any) {
      setError('Failed to fetch services');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleBook = async (serviceId: string) => {
    try {
      setActionLoading(serviceId);
      await apiService.bookService(serviceId);
      alert('Service booked successfully!');
      setActionLoading(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to book service');
      setActionLoading(null);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiService.createService(newService);
      setNewService({ title: '', description: '' });
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create service');
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-blue">Available Services</h1>
          <p className="text-gray-600">Explore and book from our wide range of professional services.</p>
        </div>
        <Button 
          variant="secondary" 
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>Create New Service</span>
        </Button>
      </div>

      <div className="relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search services..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service._id} className="bg-white flex flex-col p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-primary-red mb-2">
                  <Briefcase size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Service</span>
                </div>
                <h3 className="text-xl font-bold text-primary-blue mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <UserIcon size={14} />
                    <span>{typeof service.createdBy === 'object' ? service.createdBy.name : 'Unknown'}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-sm px-4 py-1.5 h-auto"
                    onClick={() => handleBook(service._id)}
                    isLoading={actionLoading === service._id}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg font-medium">No services found matching your search.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Create Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-primary-blue p-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">Create New Service</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:opacity-80 transition-opacity">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateService} className="p-6 space-y-6">
              <Input 
                label="Service Title"
                placeholder="e.g. Graphic Design Masterclass"
                value={newService.title}
                onChange={(e) => setNewService({...newService, title: e.target.value})}
                required
              />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue h-32 resize-none"
                  placeholder="Describe your service in detail..."
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  isLoading={loading}
                >
                  Create Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
