import React from 'react';
import type { Student, BadgeSummary, Episode, Attempt, MentorInteraction } from '../types';
import { BrainCircuit, Zap, Flame } from 'lucide-react';

export const badges: BadgeSummary[] = [
  { id: 'b1', name: 'Budgeting Basics', icon: <BrainCircuit size={16} />, type: 'concept' },
  { id: 'b2', name: 'Quick Learner', icon: <Zap size={16} />, type: 'effort' },
  { id: 'b3', name: '3-Day Streak', icon: <Flame size={16} />, type: 'streak' },
  { id: 'b4', name: 'Saving Pro', icon: <BrainCircuit size={16} />, type: 'concept' },
  { id: 'b5', name: 'Investment Intro', icon: <BrainCircuit size={16} />, type: 'concept' },
];

// --- GENERATED MOCK DATA FOR 20 STUDENTS ---
const firstNames = ['Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'Elijah', 'Charlotte', 'William', 'Sophia', 'James', 'Amelia', 'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Evelyn', 'Theodore', 'Luna'];
const lastInitials = ['S', 'J', 'B', 'M', 'P', 'G', 'W', 'T', 'H', 'C', 'K', 'R', 'L', 'D', 'N', 'F', 'V', 'Q', 'Y', 'Z'];
const schools = ['Northwood High', 'Riverdale Academy', 'Maple Creek School'];

export const students: Student[] = firstNames.map((firstName, index) => {
    const name = `${firstName} ${lastInitials[index]}.`;
    const streak = Math.floor(Math.random() * 22);
    const masteryValue = Math.floor(Math.random() * 76) + 25; // 25 to 100
    const badgeCount = Math.floor(Math.random() * 4);
    return {
        id: `s${index + 1}`,
        name: name,
        avatarUrl: `https://picsum.photos/seed/${name.replace(' ', '')}/100/100`,
        streak: streak,
        lastActivity: ['Plan Your Pound', 'Lemonade Challenge', 'Saving for Spaceship'][Math.floor(Math.random() * 3)],
        badges: badges.slice(0, badgeCount).map(b => ({...b, id: `${b.id}-${index}`})), // Ensure unique badge keys
        masteryProgress: `${masteryValue}% ${masteryValue < 40 ? '(struggling)' : ''}`,
        school: schools[index % schools.length],
    };
});


export const episodes: Episode[] = [
  { id: 'e1', title: 'Plan Your Pound', concepts: ['Budgeting', 'Net Pay'], status: 'Not started', classStatus: 'In Progress', dueDate: 'Due Fri 29 Aug', assigned: true },
  { id: 'e2', title: 'Saving for a Spaceship', concepts: ['Saving', 'Goals'], status: 'In progress', classStatus: 'Not Started', dueDate: 'Optional practice', assigned: false },
  { id: 'e3', title: 'The Lemonade Stand Challenge', concepts: ['Profit', 'Costs'], status: 'Completed', classStatus: 'Completed', assigned: true },
  { id: 'e4', title: 'Credit Score Superheroes', concepts: ['Credit', 'Debt'], status: 'Not started', assigned: false },
  // FIX: Corrected property 'name' to 'title' to match the Episode type definition.
  { id: 'e5', title: 'The Stock Market Maze', concepts: ['Investing', 'Risk'], status: 'Not started', assigned: false },
];

export const attempts: Attempt[] = [
    { id: 'a1', episodeTitle: 'Plan Your Pound', date: '2024-08-27', summary: 'Misunderstood the difference between gross and net pay, resulting in a budget deficit.', score: 45 },
    { id: 'a2', episodeTitle: 'Plan Your Pound', date: '2024-08-26', summary: 'Initial attempt, struggled with calculating tax deductions correctly.', score: 30 },
    { id: 'a3', episodeTitle: 'Lemonade Challenge', date: '2024-08-22', summary: 'Successfully managed stock and pricing to achieve a profit.', score: 92},
];

export const mentorInteractions: MentorInteraction[] = [
    { id: 'm1', question: "what's the difference between gross and net pay again?", timestamp: "2024-08-27 10:14 AM", answer: "Great question! Gross pay is your total earnings before any deductions. Net pay (or 'take-home pay') is the amount left after taxes and other deductions are subtracted. Think of it as 'gross' is the whole pizza, and 'net' is the slices you get to eat!" },
    { id: 'm2', question: "why did my budget fail?", timestamp: "2024-08-27 10:16 AM", answer: "It looks like you based your spending plan on your gross pay. Since your actual take-home (net) pay was lower, your expenses exceeded your income. For your next attempt, try building the budget using only your net pay amount." },
];


export const sparklineData = [
  { name: 'Wk 1', score: 58 }, { name: 'Wk 2', score: 62 },
  { name: 'Wk 3', score: 60 }, { name: 'Wk 4', score: 68 },
  { name: 'Wk 5', score: 75 }, { name: 'Wk 6', score: 72 },
  { name: 'Wk 7', score: 78 },
];

export const classHeatmapConcepts = ['Budgeting', 'Gross vs Net', 'Inflation', 'Saving', 'Profit', 'Interest'];

export const classHeatmapData = students.map(student => {
    const mastery: Record<string, number> = {};
    classHeatmapConcepts.forEach(concept => {
        mastery[concept] = Math.floor(Math.random() * 91) + 10; // Random score between 10 and 100
    });
    return { name: student.name, mastery, school: student.school! };
});