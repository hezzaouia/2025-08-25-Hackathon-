import React from 'react';

interface HeatmapProps {
  students: { name: string; school: string; mastery: Record<string, number> }[];
  concepts: string[];
}

const getMasteryColor = (value: number) => {
    if (value < 40) return '#fee2e2'; // Light Red
    if (value < 80) return '#dbeafe'; // Light Blue
    return '#dcfce7'; // Light Green
};
const getMasteryTextColor = (value: number) => {
    if (value < 40) return '#991b1b'; // Dark Red
    if (value < 80) return '#1e40af'; // Dark Blue
    return '#166534'; // Dark Green
}

const ClassHeatmap: React.FC<HeatmapProps> = ({ students, concepts }) => {
  const studentsBySchool = students.reduce((acc, student) => {
    const school = student.school || 'Uncategorized';
    if (!acc[school]) {
      acc[school] = [];
    }
    acc[school].push(student);
    return acc;
  }, {} as Record<string, typeof students>);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto relative">
        <table className="min-w-full border-separate" style={{ borderSpacing: '4px' }}>
          <thead>
            <tr className="text-center">
              <th className="sticky top-0 left-0 z-10 bg-surface/95 backdrop-blur-sm p-2 text-left">
                <span className="sr-only">Student Name</span>
              </th>
              {concepts.map(concept => (
                <th key={concept} className="sticky top-0 bg-surface/95 backdrop-blur-sm p-2 min-w-[120px]">
                    <span className="text-sm font-medium text-subtext">{concept}</span>
                </th>
              ))}
            </tr>
          </thead>
          {Object.entries(studentsBySchool).map(([school, schoolStudents]) => (
            <tbody key={school}>
              <tr>
                <td colSpan={concepts.length + 1} className="pt-4 pb-1">
                  <div className="font-semibold text-sm text-text bg-muted rounded-md p-2">{school}</div>
                </td>
              </tr>
              {schoolStudents.map(student => (
                <tr key={student.name}>
                  <td className="sticky left-0 bg-surface/95 backdrop-blur-sm font-medium text-sm text-subtext text-right pr-4 whitespace-nowrap">
                      {student.name}
                  </td>
                  {concepts.map(concept => {
                    const mastery = student.mastery[concept] ?? 0;
                    const bgColor = getMasteryColor(mastery);
                    const textColor = getMasteryTextColor(mastery);

                    return (
                      <td key={`${student.name}-${concept}`}>
                        <div
                          className="w-full h-10 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: bgColor }}
                          title={`${student.name} - ${concept}: ${mastery}%`}
                        >
                           <span className="text-xs font-bold" style={{ color: textColor }}>
                              {mastery}%
                           </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        {/* Right edge fade to indicate scroll */}
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent pointer-events-none" aria-hidden="true" />
      </div>
      <div className="flex justify-end items-center gap-x-4 gap-y-2 flex-wrap mt-2 text-xs text-subtext">
        <span className="font-medium text-sm">Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm ring-1 ring-inset ring-black/10" style={{ backgroundColor: getMasteryColor(20) }} />
          <span>Struggling (&lt;40%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm ring-1 ring-inset ring-black/10" style={{ backgroundColor: getMasteryColor(60) }} />
          <span>Developing (40-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm ring-1 ring-inset ring-black/10" style={{ backgroundColor: getMasteryColor(90) }} />
          <span>Mastered (&ge;80%)</span>
        </div>
      </div>
    </div>
  );
};

export default ClassHeatmap;