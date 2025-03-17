
import React from 'react';
import { PlusCircle, SearchIcon, Filter, Baby, Heart, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import ProfileCard, { ProfileType } from '@/components/ProfileCard';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState<'all' | ProfileType>('all');
  
  // Mock data
  const profiles = [
    { 
      id: '1', 
      name: 'Meera Singh', 
      type: 'pregnant' as ProfileType, 
      stage: '7 months',
      lastUpdated: 'Today',
      metrics: { weight: '58 kg' },
    },
    { 
      id: '2', 
      name: 'Arjun Kumar', 
      type: 'child' as ProfileType, 
      age: '3 years',
      lastUpdated: 'Yesterday',
      metrics: { weight: '14 kg', height: '95 cm' },
    },
    { 
      id: '3', 
      name: 'Lakshmi Reddy', 
      type: 'lactating' as ProfileType, 
      stage: '5 months postpartum',
      lastUpdated: '2 days ago',
      metrics: { weight: '55 kg' },
    },
    { 
      id: '4', 
      name: 'Rohan Sharma', 
      type: 'child' as ProfileType, 
      age: '18 months',
      lastUpdated: '3 days ago',
      metrics: { weight: '10 kg', height: '78 cm' },
    },
    { 
      id: '5', 
      name: 'Priya Patel', 
      type: 'pregnant' as ProfileType, 
      stage: '5 months',
      lastUpdated: 'Last week',
      metrics: { weight: '62 kg' },
    },
  ];
  
  const filteredProfiles = activeFilter === 'all' 
    ? profiles 
    : profiles.filter(profile => profile.type === activeFilter);

  const getFilterIcon = (type: 'all' | ProfileType) => {
    switch (type) {
      case 'child': return Baby;
      case 'pregnant': return Calendar;
      case 'lactating': return Heart;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Beneficiary Profiles" />
      
      {/* Search & Add */}
      <div className="px-4 py-4 border-b border-border sticky top-[57px] bg-white/95 backdrop-blur-sm z-10">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
          
          <button className="p-2 border border-border rounded-xl bg-background hover:bg-muted transition-colors">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'child', 'pregnant', 'lactating'].map((type) => {
            const isActive = activeFilter === type;
            const FilterIcon = getFilterIcon(type as 'all' | ProfileType);
            
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type as 'all' | ProfileType)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {FilterIcon && <FilterIcon className="w-3.5 h-3.5" />}
                <span className="font-medium capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Profile List */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {filteredProfiles.length} {activeFilter === 'all' ? 'Profiles' : `${activeFilter} Profile${filteredProfiles.length !== 1 ? 's' : ''}`}
          </h2>
          
          <AnimatedButton
            icon={PlusCircle}
            color="primary"
            size="sm"
            onClick={() => navigate('/profiles/add')}
          >
            Add New
          </AnimatedButton>
        </div>
        
        <div className="space-y-4">
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              type={profile.type}
              age={profile.age}
              stage={profile.stage}
              lastUpdated={profile.lastUpdated}
              metrics={profile.metrics}
              onClick={() => navigate(`/profiles/${profile.id}`)}
              className="animate-fade-in"
            />
          ))}
          
          {filteredProfiles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No profiles found</p>
              <AnimatedButton
                icon={PlusCircle}
                color="primary"
                className="mt-4"
                onClick={() => navigate('/profiles/add')}
              >
                Add New Profile
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
