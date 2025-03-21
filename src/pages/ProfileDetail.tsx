
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Baby, Calendar, Heart, Weight, Ruler, Edit, User, Phone, MapPin, ActivitySquare, CalendarClock, Clock, Pill } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import AnimatedButton from '@/components/AnimatedButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileType } from '@/components/ProfileCard';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API call using the id parameter
  const profilesData = [
    { 
      id: '1', 
      name: 'Meera Singh', 
      type: 'pregnant' as ProfileType, 
      age: '28 years',
      stage: '7 months',
      phone: '+91 98765 43210',
      address: '123 Gandhi Street, Delhi',
      lastUpdated: 'Today',
      attendance: '80%',
      metrics: { weight: '58 kg', height: '162 cm', bloodPressure: '110/70 mmHg', bloodSugar: '95 mg/dL' },
      upcomingVisits: [
        { date: '12 June 2023', purpose: 'Regular checkup' },
        { date: '10 July 2023', purpose: 'Ultrasound scan' }
      ],
      medicalHistory: [
        { date: '10 Mar 2023', notes: 'First trimester screening - normal' },
        { date: '15 Apr 2023', notes: 'Mild anemia detected - Iron supplements prescribed' }
      ],
      nutritionPlan: {
        title: 'Second Trimester Nutrition Plan',
        recommendations: [
          'Increase iron-rich foods like leafy greens and beans',
          'Include calcium sources like dairy or fortified plant milk',
          'Consume at least 2 servings of protein daily',
          'Stay hydrated with 8-10 glasses of water'
        ]
      }
    },
    { 
      id: '2', 
      name: 'Arjun Kumar', 
      type: 'child' as ProfileType, 
      age: '3 years',
      parentName: 'Ravi & Priya Kumar',
      phone: '+91 87654 32109',
      address: '45 Nehru Road, Mumbai',
      lastUpdated: 'Yesterday',
      attendance: '90%',
      metrics: { 
        weight: '14 kg', 
        height: '95 cm', 
        bmi: '15.5',
        weightPercentile: '65th',
        heightPercentile: '70th'
      },
      upcomingVisits: [
        { date: '20 May 2023', purpose: 'Vaccination' },
      ],
      medicalHistory: [
        { date: '15 Jan 2023', notes: 'Common cold - resolved' },
        { date: '02 Mar 2023', notes: 'Vaccination - MMR booster' }
      ],
      milestones: [
        { title: 'Speech', status: 'On track', notes: 'Using 3-4 word sentences' },
        { title: 'Motor skills', status: 'Advanced', notes: 'Can run, jump, and climb stairs' },
        { title: 'Social', status: 'On track', notes: 'Plays well with others' }
      ],
      nutritionPlan: {
        title: 'Toddler Growth Nutrition Plan',
        recommendations: [
          'Include protein in every meal',
          'Offer variety of colorful fruits and vegetables',
          'Provide 2 servings of dairy or alternatives daily',
          'Limit processed foods and sugary drinks'
        ]
      }
    },
    { 
      id: '3', 
      name: 'Lakshmi Reddy', 
      type: 'lactating' as ProfileType, 
      age: '31 years',
      stage: '5 months postpartum',
      phone: '+91 76543 21098',
      address: '78 Tagore Lane, Bangalore',
      lastUpdated: '2 days ago',
      attendance: '75%',
      metrics: { weight: '55 kg', height: '158 cm', bloodPressure: '115/75 mmHg' },
      upcomingVisits: [
        { date: '25 May 2023', purpose: 'Postpartum checkup' },
      ],
      medicalHistory: [
        { date: '10 Dec 2022', notes: 'Normal delivery' },
        { date: '15 Jan 2023', notes: 'Postpartum checkup - normal recovery' }
      ],
      babyInfo: {
        name: 'Ananya Reddy',
        age: '5 months',
        weight: '6.5 kg',
        height: '64 cm'
      },
      nutritionPlan: {
        title: 'Lactation Support Nutrition Plan',
        recommendations: [
          'Consume additional 500 calories per day',
          'Include galactagogues like fenugreek and oats',
          'Ensure adequate hydration with 10-12 glasses of water',
          'Consume calcium-rich foods daily',
          'Continue prenatal vitamins or lactation supplements'
        ]
      }
    },
    { 
      id: '4', 
      name: 'Rohan Sharma', 
      type: 'child' as ProfileType, 
      age: '18 months',
      parentName: 'Vikram & Anita Sharma',
      phone: '+91 65432 10987',
      address: '22 Bose Road, Kolkata',
      lastUpdated: '3 days ago',
      attendance: '85%',
      metrics: { 
        weight: '10 kg', 
        height: '78 cm', 
        bmi: '16.4',
        weightPercentile: '55th',
        heightPercentile: '60th'
      },
      upcomingVisits: [
        { date: '30 May 2023', purpose: 'Regular checkup' },
      ],
      medicalHistory: [
        { date: '05 Feb 2023', notes: 'Mild fever - resolved' },
        { date: '12 Mar 2023', notes: 'Vaccination - DTP booster' }
      ],
      milestones: [
        { title: 'Speech', status: 'On track', notes: 'Using 5-10 words' },
        { title: 'Motor skills', status: 'On track', notes: 'Walking well, starting to run' },
        { title: 'Social', status: 'On track', notes: 'Shows affection, plays alongside others' }
      ],
      nutritionPlan: {
        title: 'Toddler Nutrition Plan',
        recommendations: [
          'Offer variety of foods across all food groups',
          'Include iron-rich foods like meat, beans, fortified cereals',
          'Provide healthy fats for brain development',
          'Maintain regular meal and snack schedule'
        ]
      }
    },
  ];
  
  const profile = profilesData.find(p => p.id === id);
  
  if (!profile) {
    return (
      <div className="min-h-screen pb-20">
        <Header title="Profile Not Found" showBackButton />
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">The profile you're looking for could not be found.</p>
          <AnimatedButton onClick={() => navigate('/profiles')}>
            Return to Profiles
          </AnimatedButton>
        </div>
      </div>
    );
  }
  
  const getProfileTypeIcon = () => {
    switch(profile.type) {
      case 'child': return Baby;
      case 'pregnant': return Calendar;
      case 'lactating': return Heart;
      default: return User;
    }
  };
  
  const getTypeColorClasses = () => {
    switch(profile.type) {
      case 'child': return 'bg-teal-light border-teal text-teal-dark';
      case 'pregnant': return 'bg-rose-light border-rose text-rose-dark';
      case 'lactating': return 'bg-purple-light border-purple text-purple-dark';
      default: return 'bg-blue-light border-blue text-blue-dark';
    }
  };
  
  const getTypeLabel = () => {
    switch(profile.type) {
      case 'child': return 'Child';
      case 'pregnant': return 'Pregnant';
      case 'lactating': return 'Lactating';
      default: return 'Beneficiary';
    }
  };
  
  const ProfileIcon = getProfileTypeIcon();
  const typeColorClasses = getTypeColorClasses();
  const typeLabel = getTypeLabel();
  
  return (
    <div className="min-h-screen pb-20">
      <Header title={profile.name} showBackButton />
      
      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${typeColorClasses}`}>
            <ProfileIcon className="w-8 h-8" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <span className="text-sm">{typeLabel}</span>
              {profile.age && <span className="text-sm ml-2">• {profile.age}</span>}
              {profile.stage && <span className="text-sm ml-2">• {profile.stage}</span>}
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Last updated: {profile.lastUpdated}</span>
            </div>
          </div>
          
          <AnimatedButton
            icon={Edit}
            color="primary"
            size="sm"
            onClick={() => navigate(`/profiles/edit/${profile.id}`)}
          >
            Edit
          </AnimatedButton>
        </div>
        
        {/* Contact Information */}
        <Card className="p-4 mb-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          
          <div className="space-y-3">
            {profile.type === 'child' && profile.parentName && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Parent/Guardian</p>
                  <p className="font-medium">{profile.parentName}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{profile.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ActivitySquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
                <p className="font-medium">{profile.attendance}</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-4">
            <Card className="p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Health Metrics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {profile.metrics.weight && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Weight className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Weight</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.weight}</p>
                  </div>
                )}
                
                {profile.metrics.height && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Height</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.height}</p>
                  </div>
                )}
                
                {profile.metrics.bmi && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ActivitySquare className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">BMI</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.bmi}</p>
                  </div>
                )}
                
                {profile.metrics.bloodPressure && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ActivitySquare className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.bloodPressure}</p>
                  </div>
                )}
                
                {profile.metrics.bloodSugar && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ActivitySquare className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Blood Sugar</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.bloodSugar}</p>
                  </div>
                )}
                
                {profile.metrics.weightPercentile && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Weight className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Weight Percentile</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.weightPercentile}</p>
                  </div>
                )}
                
                {profile.metrics.heightPercentile && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Height Percentile</p>
                    </div>
                    <p className="text-lg font-medium">{profile.metrics.heightPercentile}</p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Child Milestones */}
            {profile.type === 'child' && profile.milestones && (
              <Card className="p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Development Milestones</h2>
                
                <div className="space-y-3">
                  {profile.milestones.map((milestone, index) => (
                    <div key={index} className="border-b border-border pb-3 last:pb-0 last:border-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{milestone.title}</p>
                        <span 
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            milestone.status === 'Advanced' ? 'bg-teal-light text-teal-dark' :
                            milestone.status === 'On track' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.notes}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Lactating Mother's Baby Info */}
            {profile.type === 'lactating' && profile.babyInfo && (
              <Card className="p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Baby Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Baby className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{profile.babyInfo.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CalendarClock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p className="font-medium">{profile.babyInfo.age}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Weight className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium">{profile.babyInfo.weight}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium">{profile.babyInfo.height}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Medical History */}
            <Card className="p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Medical History</h2>
              
              {profile.medicalHistory && profile.medicalHistory.length > 0 ? (
                <div className="space-y-3">
                  {profile.medicalHistory.map((record, index) => (
                    <div key={index} className="border-b border-border pb-3 last:pb-0 last:border-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CalendarClock className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                      <p className="font-medium">{record.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No medical history recorded.</p>
              )}
            </Card>
          </TabsContent>
          
          {/* Visits Tab */}
          <TabsContent value="visits" className="space-y-4">
            <Card className="p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Upcoming Visits</h2>
              
              {profile.upcomingVisits && profile.upcomingVisits.length > 0 ? (
                <div className="space-y-3">
                  {profile.upcomingVisits.map((visit, index) => (
                    <div key={index} className="border-b border-border pb-3 last:pb-0 last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <CalendarClock className="w-4 h-4 text-primary" />
                            <p className="text-sm font-medium text-primary">{visit.date}</p>
                          </div>
                          <p className="text-muted-foreground">{visit.purpose}</p>
                        </div>
                        <button className="text-sm text-primary">Reschedule</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No upcoming visits scheduled.</p>
              )}
              
              <div className="mt-4">
                <AnimatedButton size="sm" color="primary" icon={CalendarClock} fullWidth>
                  Schedule New Visit
                </AnimatedButton>
              </div>
            </Card>
            
            <Card className="p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Attendance History</h2>
              
              <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Attendance chart will be displayed here</p>
              </div>
            </Card>
          </TabsContent>
          
          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-4">
            <Card className="p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Current Nutrition Plan</h2>
                <button className="text-sm text-primary">Update Plan</button>
              </div>
              
              {profile.nutritionPlan ? (
                <div>
                  <h3 className="font-medium mb-2">{profile.nutritionPlan.title}</h3>
                  
                  <ul className="space-y-2">
                    {profile.nutritionPlan.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-700 text-xs">✓</span>
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No nutrition plan recorded.</p>
              )}
              
              <div className="mt-4">
                <AnimatedButton size="sm" color="primary" icon={Pill} fullWidth>
                  Add Supplements
                </AnimatedButton>
              </div>
            </Card>
            
            <Card className="p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Diet Adherence</h2>
              
              <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Diet adherence chart will be displayed here</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileDetail;
