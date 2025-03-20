import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, Calendar, Heart, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ProfileType } from '@/components/ProfileCard';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  age: z.string().optional(),
  stage: z.string().optional(),
  weight: z.string().min(1, 'Weight is required'),
  height: z.string().optional(),
  notes: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const AddProfile = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ProfileType>('child');
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      fatherName: '',
      motherName: '',
      age: '',
      stage: '',
      weight: '',
      height: '',
      notes: '',
    },
  });

  const handleSubmit = (data: ProfileFormValues) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // Show success toast
      toast.success('Profile created successfully', {
        description: `Added ${data.name} as a new ${selectedType} profile.`,
      });

      // Navigate back to profiles page
      navigate('/profiles');
    }, 1500);
  };

  const profileTypes = [
    { id: 'child', label: 'Child', icon: Baby, color: 'bg-teal-light text-teal-dark border-teal' },
    { id: 'pregnant', label: 'Pregnant', icon: Calendar, color: 'bg-rose-light text-rose-dark border-rose' },
    { id: 'lactating', label: 'Lactating', icon: Heart, color: 'bg-purple-light text-purple-dark border-purple' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Header title="Add New Profile" showBackButton />

      <div className="px-4 py-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Select Profile Type</h2>
          <div className="grid grid-cols-3 gap-3">
            {profileTypes.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedType(id as ProfileType)}
                className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  selectedType === id ? `${color} border-2` : 'bg-muted border-transparent'
                }`}
              >
                {selectedType === id && <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {selectedType === 'child' && (
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter child name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter father name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mother name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {selectedType === 'child' && (
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3 years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(selectedType === 'pregnant' || selectedType === 'lactating') && (
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem className="mb-7">
                    <FormLabel>Husband Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hasband name" {...field} />
                    </FormControl>

                    <FormLabel>First Pregnancy</FormLabel>
                    <FormControl>
                      <Input placeholder="yes/no" {...field} />
                    </FormControl>

                    <FormLabel>
                      {selectedType === 'pregnant' ? 'Pregnancy Stage' : 'Lactation Stage'}
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder={selectedType === 'pregnant' ? 'e.g., 7 months' : 'e.g., 4 months postpartum'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12 kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 95 cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional information..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <AnimatedButton type="submit" color="primary" fullWidth disabled={loading}>
                {loading ? 'Creating Profile...' : 'Create Profile'}
              </AnimatedButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProfile;
