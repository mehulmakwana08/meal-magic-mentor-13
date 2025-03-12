
import React from 'react';
import { PlusCircle, Users, UtensilsCrossed, BarChart3, VolumeX, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import ProfileCard, { ProfileType } from '@/components/ProfileCard';
import MealPlanCard from '@/components/MealPlanCard';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  
  // Mock data
  const recentProfiles = [
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
  ];
  
  const recentMealPlans = [
    {
      id: '1',
      title: 'Pregnancy Nutrition Plan',
      beneficiary: 'Meera Singh',
      period: 'This Week',
      completionRate: 75,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Child Growth Diet',
      beneficiary: 'Arjun Kumar',
      period: 'This Week',
      completionRate: 60,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop'
    }
  ];

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, this would trigger voice readout of the page content
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="Anganwadi Nutrition" />
      
      {/* Hero Section */}
      <div className="relative px-4 py-6 bg-primary/10">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-primary">Welcome Back!</h1>
          <p className="mt-1 text-gray-600">Track and support nutrition for mothers and children</p>
          
          <div className="mt-5 flex flex-wrap gap-2">
            <AnimatedButton
              icon={PlusCircle}
              color="primary"
              onClick={() => navigate('/profiles')}
            >
              New Profile
            </AnimatedButton>
            
            <button 
              onClick={toggleSpeech}
              className="p-2 bg-white rounded-full shadow-sm border border-border"
            >
              {isSpeaking ? (
                <VolumeX className="w-5 h-5 text-gray-600" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 py-5">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <div 
            onClick={() => navigate('/profiles')}
            className="flex flex-col items-center justify-center bg-teal-light text-teal-dark p-3 rounded-xl card-shadow"
          >
            <Users className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium text-center">Profiles</span>
          </div>
          
          <div
            onClick={() => navigate('/meal-plans')}
            className="flex flex-col items-center justify-center bg-amber-light text-amber-dark p-3 rounded-xl card-shadow"
          >
            <UtensilsCrossed className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium text-center">Meal Plans</span>
          </div>
          
          <div
            onClick={() => navigate('/progress')}
            className="flex flex-col items-center justify-center bg-rose-light text-rose-dark p-3 rounded-xl card-shadow"
          >
            <BarChart3 className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium text-center">Progress</span>
          </div>
        </div>
      </div>
      
      {/* Recent Profiles */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Profiles</h2>
          <button 
            onClick={() => navigate('/profiles')}
            className="text-primary text-sm font-medium"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-3 animate-slide-up">
          {recentProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              type={profile.type}
              age={profile.age}
              stage={profile.stage}
              lastUpdated={profile.lastUpdated}
              metrics={profile.metrics}
              onClick={() => navigate(`/profiles/${profile.id}`)}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Meal Plans */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Active Meal Plans</h2>
          <button 
            onClick={() => navigate('/meal-plans')}
            className="text-primary text-sm font-medium"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-4 animate-slide-up">
          {recentMealPlans.map((plan) => (
            <MealPlanCard
              key={plan.id}
              title={plan.title}
              beneficiary={plan.beneficiary}
              period={plan.period}
              completionRate={plan.completionRate}
              image={plan.image}
              onClick={() => navigate(`/meal-plans/${plan.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
