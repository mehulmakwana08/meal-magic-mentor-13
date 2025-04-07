
import React, { useState } from 'react';
import { Volume, Share2, Bookmark, BookmarkCheck, ThumbsUp, Search } from 'lucide-react';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-fade-in h-full flex flex-col">
      {image && (
        <div className="h-40 sm:h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {category}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-full">
                {language}
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-lg line-clamp-2">{title}</h3>
          </div>
          
          <button 
            onClick={onPlay}
            type="button"
            aria-label="Play audio"
            className="p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
          >
            <Volume className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <p className="mt-2 text-muted-foreground text-xs sm:text-sm line-clamp-3 flex-1">
          {description}
        </p>
        
        <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
          <div className="flex space-x-1">
            <button 
              onClick={onLike}
              type="button"
              aria-label="Like tip"
              className="p-1 sm:p-1.5 rounded-full hover:bg-muted transition-colors flex items-center gap-1"
            >
              <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">{likes}</span>
            </button>
            <button 
              onClick={onSave}
              type="button"
              aria-label={isSaved ? "Remove from saved" : "Save tip"}
              className="p-1 sm:p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              {isSaved ? (
                <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              )}
            </button>
            <button 
              onClick={onShare}
              type="button"
              aria-label="Share tip"
              className="p-1 sm:p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tips = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedTips, setSavedTips] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
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
  
  const filteredTips = tips.filter(tip => {
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    const matchesSearch = !searchQuery.trim() || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
    
  const toggleSaved = (id: string) => {
    setSavedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.info("Tip removed from saved items");
      } else {
        newSet.add(id);
        toast.success("Tip saved successfully");
      }
      return newSet;
    });
  };

  const handlePlayAudio = (title: string) => {
    console.log('Playing audio for:', title);
    toast.info(`Playing audio for: ${title}`);
  };

  const handleLike = (title: string) => {
    console.log('Liked:', title);
    toast.success(`You liked: ${title}`);
  };

  const handleShare = (title: string) => {
    console.log('Sharing:', title);
    navigator.clipboard.writeText(`Check out this nutrition tip: ${title}`);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <Header title="Nutrition Tips" />
      
      {/* Search and categories */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-border sticky top-[57px] md:top-[15px] bg-white/95 backdrop-blur-sm z-10">
        <div className="relative mb-3 sm:mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search nutrition tips..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category filters */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors",
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
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          {filteredTips.length} Nutrition Tip{filteredTips.length !== 1 ? 's' : ''}
        </h2>
        
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              onPlay={() => handlePlayAudio(tip.title)}
              onSave={() => toggleSaved(tip.id)}
              onLike={() => handleLike(tip.title)}
              onShare={() => handleShare(tip.title)}
            />
          ))}
          
          {filteredTips.length === 0 && (
            <div className="text-center py-8 col-span-full">
              <p className="text-muted-foreground">No tips found for this category</p>
              {searchQuery && (
                <button 
                  type="button"
                  className="mt-2 text-sm text-primary hover:underline"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;
