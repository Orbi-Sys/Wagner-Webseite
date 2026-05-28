import { useTranslations } from 'next-intl';
import { TeamCard } from '@/components/ui/TeamCard';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const TEAM_IMAGE = '/images/Mitarbieterbild.webp';

export function TeamSection() {
  const t = useTranslations('team');
  const members = t.raw('members') as Array<{
    name: string;
    position: string;
    bio?: string;
  }>;

  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-4">
            {t('title')}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll direction="up" delay={0.05}>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-12">
            {t('subtitle')}
          </p>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {members.map((member, index) => (
            <AnimateOnScroll key={index} direction="up" delay={index * 0.05}>
              <TeamCard
                name={member.name}
                position={member.position}
                bio={member.bio}
                imageSrc={TEAM_IMAGE}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
