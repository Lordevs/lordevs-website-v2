import { CareerCard, CareerCardProps } from './career-card';

export function CareerSection() {
  const cards: CareerCardProps[] = [
    {
      title: 'BACKEND DEV',
      features: [
        'Scalable API Design',
        'Database & Cloud Integration',
        'Performance Optimization',
        'Secure Architecture',
      ],
      tags: ['Full time', 'Internship'],
    },
    {
      title: 'FRONTEND DEV',
      features: [
        'Responsive UI Development',
        'React & Modern Frameworks',
        'Seamless API Integration',
        'Cross-Browser Compatibility',
      ],
      tags: ['Internship'],
    },
    {
      title: 'UI/UX DESIGNER',

      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Design Systems & Consistency',
        'Accessibility Focus',
      ],
      tags: ['Full time', 'Internship'],
    },
    {
      title: 'ML ENGINEER',
      features: [
        'Model Development & Training',
        'Data Pipeline Optimization',
        'AI Model Deployment',
        'Real-Time Inference',
      ],
      tags: ['Internship'],
    },
  ];

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-medium md:text-5xl">
          Career pathways we offer
        </h2>
        <p className="mx-auto mt-4 mb-18 max-w-[940px] text-base text-gray-300 md:text-2xl">
          Explore diverse career opportunities that align with your skills,
          interests, and aspirations in the AI and web development space.
        </p>
        <div className="mx-auto grid max-w-[940px] grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((card, i) => (
            <CareerCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
