import React from 'react';
import { Link } from 'react-router-dom';
import BentoGrid from '../../../components/bento/BentoGrid';
import BentoCard from '../../../components/bento/BentoCard';
import { classHeatmapData, classHeatmapConcepts, students, episodes } from '../../../lib/mockData';
import { Flame, Target, BookOpen, TrendingUp, Users, AlertTriangle, Activity, MessageCircle, ArrowRight } from 'lucide-react';
import ClassHeatmap from '../../../components/teacher/ClassHeatmap';
import StatPill from '../../../components/StatPill';

const TeacherDashboard: React.FC = () => {

  const newInsightsData = [
    {
        title: 'Misconception Patterns',
        icon: AlertTriangle,
        color: 'text-red-500',
        items: [
            "“65% of Year 8s think APR and interest rate are the same. Suggest recap: ‘Phone Plans & Subscriptions.’”",
            "“Half the class mis-identified NI as income tax. Assign: Payslip Basics mini-lesson.”"
        ]
    },
    {
        title: 'Engagement Insights',
        icon: Activity,
        color: 'text-blue-500',
        items: [
            "“Mark has logged in daily (5-day streak). James has been inactive for 4 days — consider nudging.”",
            "“Class completion rate dropped mid-week. Suggest shorter episodes or in-class recap.”"
        ]
    },
    {
        title: 'Concept Mastery Gaps',
        icon: Target,
        color: 'text-amber-600',
        items: [
            "“Strong on Budgeting and Needs vs Wants, but weak on Compound Interest (average 40% correct).”",
            "“Inflation mastered by Year 9, but Year 10 cohort shows mixed understanding.”"
        ]
    },
    {
        title: 'Reading / Level Adaptation',
        icon: BookOpen,
        color: 'text-teal-500',
        items: [
            "“Three students repeatedly request simpler definitions. Suggest enabling low-reading mode for Aisha, Sophia, James.”",
            "“Advanced group (top 20%) ready for enrichment: Investing & Diversification.”"
        ]
    },
    {
        title: 'Sentiment & Question Themes',
        icon: MessageCircle,
        color: 'text-indigo-500',
        items: [
            "“Frequent student queries: ‘Why save early?’ → indicates curiosity about compound growth.”",
            "“Multiple questions flagged as ‘too personal’ — students asking about family bills. Consider reminding class about scope.”"
        ]
    }
  ];

  const highLevelProgress = [
    {
        icon: TrendingUp,
        title: 'Class Momentum',
        summary: 'Momentum is strong with quiz scores trending upwards.',
        action: 'Introduce a challenge topic to maintain engagement.',
        iconColor: 'text-mint-400',
    },
    {
        icon: Target,
        title: 'Primary Concept Gap',
        summary: 'A concept gap is forming around "Interest Calculation".',
        action: 'Use a micro-lesson to review the topic.',
        iconColor: 'text-amber-600',
    },
    {
        icon: Users,
        title: 'Engagement Level',
        summary: 'Engagement is high, but a few students are becoming less active.',
        action: 'Check in with less active students individually.',
        iconColor: 'text-blue-500',
    },
  ];


  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
            <h1 className="h1">Class Dashboard</h1>
            <p className="small mt-1">Overview of Year 9 Financial Literacy, Period 3</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatPill
          icon={<Users size={24} />}
          label="Total Students"
          value={students.length}
        />
        <StatPill
          icon={<BookOpen size={24} />}
          label="Quests / Lessons"
          value={episodes.length}
        />
      </div>

      <BentoGrid>
        <BentoCard
          title="Class Heatmap"
          subtitle="Concepts vs. Students"
          icon={<Flame className="text-blue-500" />}
          className="md:col-span-6 lg:col-span-8 row-span-2"
        >
          <ClassHeatmap students={classHeatmapData} concepts={classHeatmapConcepts} />
        </BentoCard>

        <BentoCard
          title="AI-Generated Summary"
          subtitle="Key insights from the last 7 days"
          icon={<Target className="text-blue-500" />}
          className="md:col-span-6 lg:col-span-4"
          footer={
            <Link to="/teacher/insights" className="flex items-center justify-between text-sm font-semibold text-blue-500 hover:underline group">
              <span>View Full Insights Report</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
            <div className="h-full overflow-y-auto pr-2 space-y-4 -mr-2">
                {newInsightsData.map(({ title, icon: Icon, color, items }) => (
                    <div key={title}>
                        <h4 className={`flex items-center gap-2 font-semibold text-sm mb-2 ${color}`}>
                            <Icon size={16} />
                            <span>{title}</span>
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 small pl-2">
                            {items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </BentoCard>

        <BentoCard
          title="Progress Snapshot"
          subtitle="Top insights & recommended actions"
          icon={<TrendingUp className="text-blue-500" />}
          className="md:col-span-6 lg:col-span-4"
        >
          <div className="h-full flex flex-col justify-around space-y-4">
            {highLevelProgress.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 ${item.iconColor}`}>
                    <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-text">{item.title}</h4>
                  <p className="text-sm text-subtext leading-snug">
                    {item.summary}
                  </p>
                  <p className="text-sm text-subtext leading-snug mt-1">
                    <strong className="font-semibold text-text/90">
                      Next Step:
                    </strong>{' '}
                    {item.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

      </BentoGrid>
    </div>
  );
};

export default TeacherDashboard;