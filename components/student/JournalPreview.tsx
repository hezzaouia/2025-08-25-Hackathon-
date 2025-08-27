
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import UIBadge from '../ui/Badge';
import { demoJournalTop3 } from '../../lib/demoData';
import { ArrowRight } from 'lucide-react';

const JournalPreview = () => {
    return (
        <Card className="p-5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">Journal Preview</h3>
                <Link to="/student/journal" className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline">
                    See all in Journal <ArrowRight size={14} />
                </Link>
            </div>
            <div className="space-y-2 flex-grow overflow-hidden">
                {demoJournalTop3.slice(0, 3).map(entry => (
                    <Link to={`/student/journal?entry=${entry.id}`} key={entry.id} className="block p-2 -mx-2 group hover:bg-muted/50 rounded-md transition-colors">
                        <div className="flex justify-between items-start gap-4">
                           <div className="flex-grow">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <p className="font-medium text-text">{entry.episode}</p>
                                    <UIBadge variant={entry.result === 'Pass' ? 'mint' : 'muted'}>{entry.result}</UIBadge>
                                </div>
                                <p className="small">{entry.summary}</p>
                           </div>
                           <span className="small text-right flex-shrink-0 pt-1">{entry.ts}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
};

export default JournalPreview;
