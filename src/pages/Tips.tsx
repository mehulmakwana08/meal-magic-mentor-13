
import React from 'react';
import { VolumeUp, Share2, Bookmark, BookmarkCheck, ThumbsUp, SearchIcon } from 'lucide-react';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';

interface TipCardProps {
  title: string;
  description: string;
  image?: string;
  category: string;
  language: string;
  isSaved?: boolean;
  likes: number;
  onPlay?: () => void;
  onSave?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}

const TipCard = ({
  title,
  description,
  image,
  category,
  language,
  isSaved = false,
  likes,
  onPlay,
  onSave,
  onLike,
  onShare,
}: TipCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden card-shadow animate-fade-in">
      {image && (
        <div className="h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {category}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-full">
                {language}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          
          <button 
            onClick={onPlay}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <VolumeUp className="w-5 h-5" />
          </button>
        </div>
        
        <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
        
        <div className="mt-4 pt-2 border-t border-border flex items-center justify-between">
          <div className="flex space-x-1">
            <button 
              onClick={onLike}
              className="p-1.5 rounded-full hover:bg-muted transition-colors flex items-center gap-1"
            >
              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{likes}</span>
            </button>
            <button 
              onClick={onSave}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button 
              onClick={onShare}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tips = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [savedTips, setSavedTips] = React.useState<Set<string>>(new Set());
  
  // Mock data
  const categories = [
    'all',
    'pregnancy',
    'breastfeeding',
    'child',
    'recipes',
    'local foods',
  ];
  
  const tips = [
    {
      id: '1',
      title: 'Iron-Rich Foods for Pregnancy',
      description: 'Include leafy greens, beans, and fortified cereals in your diet to boost iron levels during pregnancy. Iron supports healthy blood production and oxygen transport to your baby.',
      image: 'https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=500&auto=format&fit=crop',
      category: 'pregnancy',
      language: 'English',
      likes: 24,
    },
    {
      id: '2',
      title: 'Ragi Porridge for Toddlers',
      description: 'Ragi porridge is an excellent source of calcium and protein for growing children. Add jaggery and milk for a nutritious breakfast option that supports bone development.',
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=500&auto=format&fit=crop',
      category: 'recipes',
      language: 'Hindi',
      likes: 32,
    },
    {
      id: '3',
      title: 'Posture Tips for Breastfeeding',
      description: 'Proper posture during breastfeeding can prevent backaches and ensure your baby latches correctly. Use pillows for support and ensure your back is straight.',
      image: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=500&auto=format&fit=crop',
      category: 'breastfeeding',
      language: 'Telugu',
      likes: 18,
    },
    {
      id: '4',
      title: 'Seasonal Fruits for Children',
      description: 'Seasonal fruits like mangoes, guavas, and bananas provide essential vitamins and minerals. Incorporate them into your child\'s diet for improved immunity and growth.',
      image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=500&auto=format&fit=crop',
      category: 'child',
      language: 'English',
      likes: 29,
    },
    {
      id: '5',
      title: 'Traditional Dal Preparations',
      description: 'Local dal varieties like toor, moong, and masoor are excellent protein sources. Learn how to prepare them with indigenous spices for maximum nutrition and flavor.',
      image: 'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?q=80&w=500&auto=format&fit=crop',
      category: 'local foods',
      language: 'Hindi',
      likes: 15,
    },
  ];
  
  const filteredTips = activeCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);
    
  const toggleSaved = (id: string) => {
    setSavedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="Nutrition Tips" />
      
      {/* Search */}
      <div className="px-4 py-4 border-b border-border sticky top-[57px] bg-white/95 backdrop-blur-sm z-10">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search nutrition tips..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
        
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <span className="font-medium capitalize">{category}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tips List */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold mb-4">
          {filteredTips.length} Nutrition Tip{filteredTips.length !== 1 ? 's' : ''}
        </h2>
        
        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <TipCard
              key={tip.id}
              title={tip.title}
              description={tip.description}
              image={tip.image}
              category={tip.category}
              language={tip.language}
              isSaved={savedTips.has(tip.id)}
              likes={tip.likes}
              onPlay={() => console.log('Playing audio for:', tip.title)}
              onSave={() => toggleSaved(tip.id)}
              onLike={() => console.log('Liked:', tip.title)}
              onShare={() => console.log('Sharing:', tip.title)}
            />
          ))}
          
          {filteredTips.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tips found for this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;
