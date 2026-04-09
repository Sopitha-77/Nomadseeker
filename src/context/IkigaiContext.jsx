import React, { createContext, useContext, useState, useEffect } from 'react';

const IkigaiContext = createContext();

export const useIkigai = () => {
  const context = useContext(IkigaiContext);
  if (!context) throw new Error('useIkigai must be used within IkigaiProvider');
  return context;
};

/* ═══════════════════════════════════════════════════════════════
   TRAIT MAPPING  — every answer option → trait list
   Each option value (A–H) per question maps to weighted traits.
   Covers all 3 categories × 6 days × 6 questions × 8 options.
═══════════════════════════════════════════════════════════════ */
const TRAIT_MAP = {
  /* ── ENTREPRENEUR Day 1 ─────────────────────────────────── */
  e1_q1: {
    A: ['Collaboration', 'Community'],
    B: ['Execution', 'Teamwork'],
    C: ['Empathy', 'Teaching'],
    D: ['Communication', 'Creativity'],
    E: ['Collaboration', 'Problem-Solving'],
    F: ['Purpose', 'Community'],
    G: ['Teamwork', 'Growth'],
    H: ['Validation', 'Community'],
  },
  e1_q2: {
    A: ['Leadership', 'Teamwork'],
    B: ['Leadership', 'Inspiration'],
    C: ['Execution', 'Innovation'],
    D: ['Networking', 'Collaboration'],
    E: ['Execution', 'Discipline'],
    F: ['Systems-Thinking', 'Collaboration'],
    G: ['Empathy', 'Teaching'],
    H: ['Vision', 'Growth'],
  },
  e1_q3: {
    A: ['Creativity', 'Collaboration'],
    B: ['Vision', 'Strategy'],
    C: ['Growth', 'Learning'],
    D: ['Innovation', 'Entrepreneurship'],
    E: ['Teamwork', 'Observation'],
    F: ['Creativity', 'Entrepreneurship'],
    G: ['Iteration', 'Growth'],
    H: ['Networking', 'Community'],
  },
  e1_q4: {
    A: ['Impact', 'Entrepreneurship'],
    B: ['Collaboration', 'Vision'],
    C: ['Execution', 'Leadership'],
    D: ['Community', 'Belonging'],
    E: ['Opportunity-Creation', 'Entrepreneurship'],
    F: ['Problem-Solving', 'Impact'],
    G: ['Growth', 'Learning'],
    H: ['Execution', 'Action'],
  },
  e1_q5: {
    A: ['Entrepreneurship', 'Innovation'],
    B: ['Teamwork', 'Collaboration'],
    C: ['Growth', 'Mindset'],
    D: ['Entrepreneurship', 'Action'],
    E: ['Networking', 'Community'],
    F: ['Inspiration', 'Entrepreneurship'],
    G: ['Resilience', 'Authenticity'],
    H: ['Vision', 'Impact'],
  },
  e1_q6: {
    A: ['Creativity', 'Collaboration'],
    B: ['Strategy', 'Planning'],
    C: ['Learning', 'Growth'],
    D: ['Communication', 'Community'],
    E: ['Execution', 'Building'],
    F: ['Research', 'Growth'],
    G: ['Iteration', 'Creativity'],
    H: ['Networking', 'Inspiration'],
  },
  /* ── ENTREPRENEUR Day 2 ─────────────────────────────────── */
  e2_q1: {
    A: ['Entrepreneurship', 'Building'],
    B: ['Communication', 'Creativity'],
    C: ['Technical', 'Learning'],
    D: ['Creativity', 'Innovation'],
    E: ['Analytical', 'Problem-Solving'],
    F: ['Execution', 'Discipline'],
    G: ['Mindset', 'Growth'],
    H: ['Starting', 'Action'],
  },
  e2_q2: {
    A: ['Strategy', 'Mentoring'],
    B: ['Problem-Solving', 'Technical'],
    C: ['Teaching', 'Communication'],
    D: ['Creativity', 'Brainstorming'],
    E: ['Technical', 'Systems-Thinking'],
    F: ['Empathy', 'Leadership'],
    G: ['Planning', 'Organization'],
    H: ['Networking', 'Connection'],
  },
  e2_q3: {
    A: ['Empathy', 'Emotional-Intelligence'],
    B: ['Creativity', 'Innovation'],
    C: ['Analytical', 'Logic'],
    D: ['Communication', 'Clarity'],
    E: ['Learning', 'Adaptability'],
    F: ['Leadership', 'Initiative'],
    G: ['Adaptability', 'Resilience'],
    H: ['Community', 'Networking'],
  },
  e2_q4: {
    A: ['Empathy', 'Impact'],
    B: ['Problem-Solving', 'Challenge'],
    C: ['Discipline', 'Execution'],
    D: ['Creativity', 'Recognition'],
    E: ['Collaboration', 'Purpose'],
    F: ['Growth', 'Learning'],
    G: ['Execution', 'Progress'],
    H: ['Trust', 'Reliability'],
  },
  e2_q5: {
    A: ['Entrepreneurship', 'Validation'],
    B: ['Creativity', 'Ideation'],
    C: ['Problem-Solving', 'Frameworks'],
    D: ['Communication', 'Storytelling'],
    E: ['Technical', 'Systems-Thinking'],
    F: ['Discipline', 'Consistency'],
    G: ['Planning', 'Execution'],
    H: ['Teamwork', 'Collaboration'],
  },
  e2_q6: {
    A: ['Empathy', 'Impact'],
    B: ['Problem-Solving', 'Execution'],
    C: ['Discipline', 'Completion'],
    D: ['Learning', 'Mastery'],
    E: ['Collaboration', 'Teamwork'],
    F: ['Building', 'Creation'],
    G: ['Resilience', 'Mindset'],
    H: ['Creativity', 'Innovation'],
  },
  /* ── ENTREPRENEUR Day 3 ─────────────────────────────────── */
  e3_q1: {
    A: ['Collaboration', 'Co-founding'],
    B: ['Freelancing', 'Skills'],
    C: ['Startup', 'Action'],
    D: ['Building', 'Entrepreneurship'],
    E: ['Learning', 'Community'],
    F: ['Problem-Solving', 'Authenticity'],
    G: ['Partnership', 'Collaboration'],
    H: ['Contribution', 'Growth'],
  },
  e3_q2: {
    A: ['Problem-Solving', 'Value'],
    B: ['Skills', 'Service'],
    C: ['Creativity', 'Content'],
    D: ['Teaching', 'Coaching'],
    E: ['Systems-Thinking', 'Technical'],
    F: ['Efficiency', 'Value'],
    G: ['Innovation', 'Creativity'],
    H: ['Empathy', 'Support'],
  },
  e3_q3: {
    A: ['Systems-Thinking', 'Scale'],
    B: ['Collaboration', 'Partnership'],
    C: ['Strategy', 'Niche'],
    D: ['Growth', 'Mastery'],
    E: ['Validation', 'Action'],
    F: ['Scale', 'Entrepreneurship'],
    G: ['Consistency', 'Discipline'],
    H: ['Mentoring', 'Guidance'],
  },
  e3_q4: {
    A: ['Validation', 'Proof'],
    B: ['Learning', 'Observation'],
    C: ['Market-Awareness', 'Research'],
    D: ['Belief', 'Vision'],
    E: ['Community', 'Learning'],
    F: ['Networking', 'Mentoring'],
    G: ['Research', 'Learning'],
    H: ['Uncertainty', 'Caution'],
  },
  e3_q5: {
    A: ['Problem-Solving', 'Value'],
    B: ['Efficiency', 'Simplification'],
    C: ['Coaching', 'Teaching'],
    D: ['Systems-Thinking', 'Tools'],
    E: ['Empathy', 'Support'],
    F: ['Experience', 'Value'],
    G: ['Innovation', 'Systems'],
    H: ['Coaching', 'Guidance'],
  },
  e3_q6: {
    A: ['Building', 'Creation'],
    B: ['Startup', 'Entrepreneurship'],
    C: ['Problem-Solving', 'Systems'],
    D: ['Collaboration', 'Teamwork'],
    E: ['Strategy', 'Planning'],
    F: ['Teaching', 'Guidance'],
    G: ['Management', 'Organization'],
    H: ['Innovation', 'Experimentation'],
  },
  /* ── ENTREPRENEUR Day 4 ─────────────────────────────────── */
  e4_q1: {
    A: ['Mentoring', 'Strategy'],
    B: ['Problem-Solving', 'Technical'],
    C: ['Empathy', 'Support'],
    D: ['Creativity', 'Insight'],
    E: ['Teaching', 'Communication'],
    F: ['Networking', 'Connection'],
    G: ['Motivation', 'Inspiration'],
    H: ['Action', 'Execution'],
  },
  e4_q2: {
    A: ['Community', 'Collaboration'],
    B: ['Building', 'Skills'],
    C: ['Leadership', 'Organization'],
    D: ['Teaching', 'Content'],
    E: ['Empathy', 'Support'],
    F: ['Building', 'Impact'],
    G: ['Collaboration', 'Community'],
    H: ['Mentoring', 'Teaching'],
  },
  e4_q3: {
    A: ['Impact', 'Opportunity-Creation'],
    B: ['Empathy', 'Purpose'],
    C: ['Efficiency', 'Systems-Thinking'],
    D: ['Community', 'Collaboration'],
    E: ['Teaching', 'Access'],
    F: ['Courage', 'Resilience'],
    G: ['Empathy', 'Growth'],
    H: ['Purpose', 'Mission'],
  },
  e4_q4: {
    A: ['Teaching', 'Knowledge'],
    B: ['Problem-Solving', 'Impact'],
    C: ['Mentoring', 'Growth'],
    D: ['Motivation', 'Inspiration'],
    E: ['Building', 'Systems-Thinking'],
    F: ['Community', 'Connection'],
    G: ['Leadership', 'Role-Model'],
    H: ['Opportunity-Creation', 'Impact'],
  },
  e4_q5: {
    A: ['Skills', 'Expertise'],
    B: ['Creativity', 'Innovation'],
    C: ['Problem-Solving', 'Value'],
    D: ['Experience', 'Wisdom'],
    E: ['Networking', 'Connections'],
    F: ['Teaching', 'Guidance'],
    G: ['Building', 'Creation'],
    H: ['Empathy', 'Support'],
  },
  e4_q6: {
    A: ['Community', 'Collaboration'],
    B: ['Courage', 'Action'],
    C: ['Belief', 'Growth'],
    D: ['Collaboration', 'Community'],
    E: ['Action', 'Execution'],
    F: ['Building', 'Impact'],
    G: ['Teaching', 'Growth'],
    H: ['Community', 'Support'],
  },
  /* ── ENTREPRENEUR Day 5 ─────────────────────────────────── */
  e5_q1: {
    A: ['Passion', 'Consistency'],
    B: ['Passion', 'Communication'],
    C: ['Action', 'Initiative'],
    D: ['Passion', 'Energy'],
    E: ['Flow', 'Love'],
    F: ['Growth', 'Passion'],
    G: ['Teaching', 'Passion'],
    H: ['Action', 'Execution'],
  },
  e5_q2: {
    A: ['Impact', 'Building'],
    B: ['Innovation', 'Problem-Solving'],
    C: ['Exploration', 'Culture'],
    D: ['Entrepreneurship', 'Passion'],
    E: ['Teaching', 'Mentoring'],
    F: ['Creativity', 'Expression'],
    G: ['Purpose', 'Environment'],
    H: ['Community', 'Building'],
  },
  e5_q3: {
    A: ['Empathy', 'Impact'],
    B: ['Disruption', 'Innovation'],
    C: ['Access', 'Education'],
    D: ['Legacy', 'Building'],
    E: ['Inspiration', 'Leadership'],
    F: ['Problem-Solving', 'Scale'],
    G: ['Creativity', 'Meaning'],
    H: ['Community', 'Values'],
  },
  e5_q4: {
    A: ['Education', 'Access'],
    B: ['Entrepreneurship', 'Opportunity'],
    C: ['Justice', 'Equality'],
    D: ['Environment', 'Sustainability'],
    E: ['Health', 'Wellness'],
    F: ['Equality', 'Justice'],
    G: ['Peace', 'Harmony'],
    H: ['Creativity', 'Innovation'],
  },
  e5_q5: {
    A: ['Challenge', 'Mastery'],
    B: ['Collaboration', 'Passion'],
    C: ['Learning', 'Curiosity'],
    D: ['Teaching', 'Impact'],
    E: ['Creation', 'Building'],
    F: ['Problem-Solving', 'Mastery'],
    G: ['Leadership', 'Impact'],
    H: ['Empathy', 'Service'],
  },
  e5_q6: {
    A: ['Inspiration', 'Legacy'],
    B: ['Change', 'Impact'],
    C: ['Legacy', 'Building'],
    D: ['Service', 'Empathy'],
    E: ['Knowledge', 'Discovery'],
    F: ['Connection', 'Community'],
    G: ['Environment', 'Future'],
    H: ['Impact', 'Legacy'],
  },
  /* ── ENTREPRENEUR Day 6 ─────────────────────────────────── */
  e6_q1: {
    A: ['Opportunity-Creation', 'Impact'],
    B: ['Empathy', 'Purpose'],
    C: ['Efficiency', 'Systems-Thinking'],
    D: ['Access', 'Education'],
    E: ['Environment', 'Sustainability'],
    F: ['Mental-Health', 'Wellness'],
    G: ['Education', 'Skills'],
    H: ['Community', 'Connection'],
  },
  e6_q2: {
    A: ['Entrepreneurship', 'Mentoring'],
    B: ['Career', 'Change'],
    C: ['Justice', 'Service'],
    D: ['Education', 'Youth'],
    E: ['Business', 'Enterprise'],
    F: ['Empathy', 'Service'],
    G: ['Impact', 'Global'],
    H: ['Purpose', 'Growth'],
  },
  e6_q3: {
    A: ['Empowerment', 'Mentoring'],
    B: ['Impact', 'Building'],
    C: ['Systems-Thinking', 'Legacy'],
    D: ['Leadership', 'Inspiration'],
    E: ['Scale', 'Impact'],
    F: ['Access', 'Knowledge'],
    G: ['Role-Model', 'Inspiration'],
    H: ['Community', 'Purpose'],
  },
  e6_q4: {
    A: ['Integrity', 'Trust'],
    B: ['Empathy', 'Compassion'],
    C: ['Innovation', 'Creativity'],
    D: ['Excellence', 'Quality'],
    E: ['Collaboration', 'Community'],
    F: ['Growth', 'Learning'],
    G: ['Freedom', 'Autonomy'],
    H: ['Service', 'Contribution'],
  },
  e6_q5: {
    A: ['Entrepreneurship', 'Courage'],
    B: ['Impact', 'Mission'],
    C: ['Exploration', 'Experience'],
    D: ['Learning', 'Mastery'],
    E: ['Service', 'Empathy'],
    F: ['Community', 'Family'],
    G: ['Creativity', 'Expression'],
    H: ['Courage', 'Risk'],
  },
  e6_q6: {
    A: ['Service', 'Value'],
    B: ['Mastery', 'Growth'],
    C: ['Connection', 'Relationships'],
    D: ['Impact', 'Mission'],
    E: ['Learning', 'Curiosity'],
    F: ['Building', 'Creation'],
    G: ['Teaching', 'Guidance'],
    H: ['Resilience', 'Challenge'],
  },
  /* ── MANAGERIAL Day 1 ───────────────────────────────────── */
  m1_q1: {
    A: ['Problem-Solving', 'Impact'],
    B: ['Efficiency', 'Systems'],
    C: ['Teaching', 'Simplification'],
    D: ['Systems-Thinking', 'Efficiency'],
    E: ['Strategy', 'Business'],
    F: ['Problem-Solving', 'Clarity'],
    G: ['Teaching', 'Mentoring'],
    H: ['Innovation', 'Improvement'],
  },
  m1_q2: {
    A: ['Problem-Solving', 'Business'],
    B: ['Building', 'Systems'],
    C: ['Empathy', 'Research'],
    D: ['Innovation', 'Creativity'],
    E: ['Execution', 'Strategy'],
    F: ['Business', 'Efficiency'],
    G: ['Analytical', 'Foresight'],
    H: ['Design', 'Impact'],
  },
  m1_q3: {
    A: ['Analytical', 'Problem-Solving'],
    B: ['Innovation', 'Problem-Solving'],
    C: ['Efficiency', 'Systems'],
    D: ['Empathy', 'Research'],
    E: ['Business', 'Learning'],
    F: ['Efficiency', 'Innovation'],
    G: ['Analytical', 'Simplification'],
    H: ['Market-Awareness', 'Strategy'],
  },
  m1_q4: {
    A: ['Impact', 'Problem-Solving'],
    B: ['Building', 'Creation'],
    C: ['Empathy', 'Systems'],
    D: ['Efficiency', 'Business'],
    E: ['Innovation', 'Creativity'],
    F: ['Mentoring', 'Systems'],
    G: ['Legacy', 'Value'],
    H: ['Execution', 'Problem-Solving'],
  },
  m1_q5: {
    A: ['Problem-Solving', 'Research'],
    B: ['Efficiency', 'Systems'],
    C: ['Entrepreneurship', 'Innovation'],
    D: ['Empathy', 'Behavior'],
    E: ['Efficiency', 'Productivity'],
    F: ['Business', 'Growth'],
    G: ['Innovation', 'Vision'],
    H: ['Problem-Solving', 'Case-Studies'],
  },
  m1_q6: {
    A: ['Problem-Solving', 'Innovation'],
    B: ['Research', 'Empathy'],
    C: ['Design', 'Strategy'],
    D: ['Planning', 'Execution'],
    E: ['Efficiency', 'Optimization'],
    F: ['Strategy', 'Business'],
    G: ['Learning', 'Tools'],
    H: ['Experimentation', 'Innovation'],
  },
  /* ── MANAGERIAL Day 2 ───────────────────────────────────── */
  m2_q1: {
    A: ['Problem-Solving', 'Learning'],
    B: ['Analytical', 'Thinking'],
    C: ['Technical', 'Digital'],
    D: ['Research', 'Problem-Solving'],
    E: ['Innovation', 'Creativity'],
    F: ['Business', 'Strategy'],
    G: ['Communication', 'Explanation'],
    H: ['Tools', 'Building'],
  },
  m2_q2: {
    A: ['Problem-Solving', 'Strategy'],
    B: ['Advisory', 'Mentoring'],
    C: ['Communication', 'Teaching'],
    D: ['Improvement', 'Systems'],
    E: ['Innovation', 'Creativity'],
    F: ['Technical', 'Support'],
    G: ['Decision-Making', 'Strategy'],
    H: ['Innovation', 'Efficiency'],
  },
  m2_q3: {
    A: ['Problem-Solving', 'Foresight'],
    B: ['Practical', 'Solutions'],
    C: ['Analytical', 'Logic'],
    D: ['Empathy', 'Research'],
    E: ['Communication', 'Clarity'],
    F: ['Learning', 'Adaptability'],
    G: ['Systems-Thinking', 'Patterns'],
    H: ['Efficiency', 'Improvement'],
  },
  m2_q4: {
    A: ['Problem-Solving', 'Impact'],
    B: ['Empathy', 'Mentoring'],
    C: ['Execution', 'Improvement'],
    D: ['Creativity', 'Recognition'],
    E: ['Progress', 'Results'],
    F: ['Discipline', 'Completion'],
    G: ['Problem-Solving', 'Recognition'],
    H: ['Efficiency', 'Empathy'],
  },
  m2_q5: {
    A: ['Teaching', 'Problem-Solving'],
    B: ['Analytical', 'Thinking'],
    C: ['Building', 'Systems'],
    D: ['Empathy', 'Research'],
    E: ['Creativity', 'Innovation'],
    F: ['Efficiency', 'Improvement'],
    G: ['Simplification', 'Communication'],
    H: ['Innovation', 'Opportunity'],
  },
  m2_q6: {
    A: ['Problem-Solving', 'Impact'],
    B: ['Empathy', 'Mentoring'],
    C: ['Efficiency', 'Systems'],
    D: ['Completion', 'Discipline'],
    E: ['Learning', 'Mastery'],
    F: ['Creation', 'Value'],
    G: ['Recognition', 'Leadership'],
    H: ['Foresight', 'Problem-Solving'],
  },
  /* ── MANAGERIAL Days 3–6 (condensed but complete) ────────── */
  m3_q1: { A: ['Authenticity', 'Experience'], B: ['Community', 'Service'], C: ['Freelancing', 'Skills'], D: ['Collaboration', 'Team'], E: ['Building', 'Innovation'], F: ['Business', 'Joining'], G: ['Validation', 'Testing'], H: ['Learning', 'Mentoring'] },
  m3_q2: { A: ['Problem-Solving', 'Value'], B: ['Efficiency', 'Service'], C: ['Advisory', 'Consulting'], D: ['Tools', 'Systems'], E: ['Experience', 'Value'], F: ['Efficiency', 'Speed'], G: ['Reliability', 'Support'], H: ['Innovation', 'Problem-Solving'] },
  m3_q3: { A: ['Value', 'Problem-Solving'], B: ['Scale', 'Systems'], C: ['Validation', 'Strategy'], D: ['Improvement', 'Mastery'], E: ['Validation', 'Proof'], F: ['Collaboration', 'Team'], G: ['Niche', 'Strategy'], H: ['Mentoring', 'Guidance'] },
  m3_q4: { A: ['Validation', 'Proof'], B: ['Learning', 'Observation'], C: ['Market-Awareness', 'Research'], D: ['Community', 'Learning'], E: ['Networking', 'Mentoring'], F: ['Research', 'Case-Studies'], G: ['Belief', 'Vision'], H: ['Uncertainty', 'Caution'] },
  m3_q5: { A: ['Problem-Solving', 'Value'], B: ['Efficiency', 'Speed'], C: ['Advisory', 'Guidance'], D: ['Systems', 'Efficiency'], E: ['Results', 'Value'], F: ['Reliability', 'Consistency'], G: ['Innovation', 'Systems'], H: ['Coaching', 'Guidance'] },
  m3_q6: { A: ['Building', 'Creation'], B: ['Problem-Solving', 'Systems'], C: ['Empathy', 'Service'], D: ['Strategy', 'Planning'], E: ['Collaboration', 'Team'], F: ['Teaching', 'Guidance'], G: ['Management', 'Scale'], H: ['Experimentation', 'Innovation'] },
  m4_q1: { A: ['Advisory', 'Strategy'], B: ['Problem-Solving', 'Technical'], C: ['Empathy', 'Listening'], D: ['Creativity', 'Insight'], E: ['Teaching', 'Explanation'], F: ['Efficiency', 'Improvement'], G: ['Networking', 'Connection'], H: ['Action', 'Execution'] },
  m4_q2: { A: ['Skills', 'Problem-Solving'], B: ['Collaboration', 'Community'], C: ['Teaching', 'Content'], D: ['Empathy', 'Support'], E: ['Building', 'Community'], F: ['Community', 'Joining'], G: ['Mentoring', 'Teaching'], H: ['Building', 'Solutions'] },
  m4_q3: { A: ['Problem-Solving', 'Purpose'], B: ['Innovation', 'Practical'], C: ['Efficiency', 'Systems'], D: ['Empathy', 'Clarity'], E: ['Access', 'Education'], F: ['Courage', 'Action'], G: ['Potential', 'Growth'], H: ['Purpose', 'Meaning'] },
  m4_q4: { A: ['Teaching', 'Knowledge'], B: ['Problem-Solving', 'Impact'], C: ['Simplification', 'Communication'], D: ['Growth', 'Mentoring'], E: ['Building', 'Tools'], F: ['Action', 'Motivation'], G: ['Opportunity', 'Creation'], H: ['Efficiency', 'Improvement'] },
  m4_q5: { A: ['Problem-Solving', 'Value'], B: ['Creativity', 'Innovation'], C: ['Skills', 'Expertise'], D: ['Wisdom', 'Experience'], E: ['Building', 'Solutions'], F: ['Guidance', 'Mentoring'], G: ['Networking', 'Connection'], H: ['Efficiency', 'Systems'] },
  m4_q6: { A: ['Problem-Solving', 'Opportunity'], B: ['Action', 'Courage'], C: ['Simplification', 'Impact'], D: ['Action', 'Decisiveness'], E: ['Ideas', 'Value'], F: ['Problem-Solving', 'Focus'], G: ['Learning', 'Improvement'], H: ['Building', 'Impact'] },
  m5_q1: { A: ['Efficiency', 'Business'], B: ['Empathy', 'Experience'], C: ['Team', 'Collaboration'], D: ['Strategy', 'Growth'], E: ['Market', 'Innovation'], F: ['Process', 'Efficiency'], G: ['Communication', 'Alignment'], H: ['Creativity', 'Innovation'] },
  m5_q2: { A: ['Leadership', 'Vision'], B: ['Systems', 'Efficiency'], C: ['Problem-Solving', 'Business'], D: ['Mentoring', 'Development'], E: ['Innovation', 'Product'], F: ['Culture', 'Leadership'], G: ['Strategy', 'Execution'], H: ['Optimization', 'Process'] },
  m5_q3: { A: ['Strategy', 'Analytical'], B: ['Problem-Solving', 'Troubleshooting'], C: ['Coordination', 'Management'], D: ['Efficiency', 'Systems'], E: ['Communication', 'Clarity'], F: ['Analytical', 'Data'], G: ['Networking', 'Relationships'], H: ['Organization', 'Structure'] },
  m5_q4: { A: ['Scale', 'Growth'], B: ['Engagement', 'Culture'], C: ['Efficiency', 'Cost'], D: ['Customer', 'Loyalty'], E: ['Speed', 'Development'], F: ['Supply', 'Operations'], G: ['Digital', 'Innovation'], H: ['Leadership', 'Team'] },
  m5_q5: { A: ['Revenue', 'Profitability'], B: ['Retention', 'Team'], C: ['Customer', 'Success'], D: ['Process', 'Improvement'], E: ['Innovation', 'Launch'], F: ['Problem-Solving', 'Results'], G: ['Mentoring', 'Development'], H: ['Efficiency', 'Gains'] },
  m5_q6: { A: ['Empathy', 'Service'], B: ['Creativity', 'Vision'], C: ['Team', 'Collaboration'], D: ['Problem-Solving', 'Purpose'], E: ['Legacy', 'Building'], F: ['Learning', 'Growth'], G: ['Recognition', 'Leadership'], H: ['Autonomy', 'Freedom'] },
  m6_q1: { A: ['Efficiency', 'Business'], B: ['Culture', 'Workplace'], C: ['Growth', 'Sustainability'], D: ['Strategy', 'Execution'], E: ['Decision-Making', 'Leadership'], F: ['Collaboration', 'Team'], G: ['Innovation', 'Industry'], H: ['Systems', 'Empowerment'] },
  m6_q2: { A: ['Startup', 'Entrepreneurship'], B: ['Growth', 'Scale'], C: ['Change', 'Transformation'], D: ['Team', 'Collaboration'], E: ['Leadership', 'Results'], F: ['Career', 'Development'], G: ['Innovation', 'Building'], H: ['Improvement', 'Impact'] },
  m6_q3: { A: ['Systems', 'Organization'], B: ['Strategy', 'Execution'], C: ['Team', 'Empowerment'], D: ['Innovation', 'Industry'], E: ['Culture', 'Workplace'], F: ['Building', 'Problem-Solving'], G: ['Sustainability', 'Growth'], H: ['Change', 'Impact'] },
  m6_q4: { A: ['Integrity', 'Trust'], B: ['Empathy', 'Inclusion'], C: ['Excellence', 'Accountability'], D: ['Innovation', 'Courage'], E: ['Collaboration', 'Team'], F: ['Growth', 'Learning'], G: ['Service', 'Humility'], H: ['Results', 'Impact'] },
  m6_q5: { A: ['Digital', 'Transformation'], B: ['Culture', 'Change'], C: ['Process', 'Innovation'], D: ['Disruption', 'Market'], E: ['Social', 'Impact'], F: ['Sustainability', 'Green'], G: ['Customer', 'Experience'], H: ['Flexibility', 'Workplace'] },
  m6_q6: { A: ['Impact', 'People'], B: ['Transformation', 'Business'], C: ['Mentoring', 'Team'], D: ['Problem-Solving', 'Results'], E: ['Innovation', 'Leadership'], F: ['Legacy', 'Creation'], G: ['Development', 'Mentoring'], H: ['Change', 'Impact'] },
  /* ── TECHNICIAN Days 1–6 (condensed but complete) ────────── */
  t1_q1: { A: ['Impact', 'Skills'], B: ['Purpose', 'Community'], C: ['Empathy', 'Impact'], D: ['Problem-Solving', 'Expertise'], E: ['Recognition', 'Excellence'], F: ['Community', 'Growth'], G: ['Persistence', 'Legacy'], H: ['Legacy', 'Creation'] },
  t1_q2: { A: ['Problem-Solving', 'Technical'], B: ['Leadership', 'Field'], C: ['Impact', 'Scale'], D: ['Teaching', 'Mentoring'], E: ['Scale', 'Building'], F: ['Innovation', 'Technical'], G: ['Systems', 'Impact'], H: ['Mission', 'Purpose'] },
  t1_q3: { A: ['Mastery', 'Practice'], B: ['Application', 'Challenge'], C: ['Learning', 'Advanced'], D: ['Teaching', 'Knowledge'], E: ['Problem-Solving', 'Expertise'], F: ['Impact', 'Exploration'], G: ['Vision', 'Application'], H: ['Improvement', 'Results'] },
  t1_q4: { A: ['Impact', 'Skills'], B: ['Community', 'Service'], C: ['Change', 'Mission'], D: ['Mission', 'Purpose'], E: ['Scale', 'Building'], F: ['Teaching', 'Growth'], G: ['Problem-Solving', 'Purpose'], H: ['Legacy', 'Impact'] },
  t1_q5: { A: ['Technical', 'Mastery'], B: ['Problem-Solving', 'Field'], C: ['Empathy', 'Teaching'], D: ['Mastery', 'Growth'], E: ['Scale', 'Impact'], F: ['Teaching', 'Content'], G: ['Building', 'Mission'], H: ['Inspiration', 'Impact'] },
  t1_q6: { A: ['Practice', 'Mastery'], B: ['Purpose', 'Projects'], C: ['Teaching', 'Mentoring'], D: ['Problem-Solving', 'Real-World'], E: ['Building', 'Impact'], F: ['Research', 'Scale'], G: ['Collaboration', 'Mission'], H: ['Systems', 'Creation'] },
  t2_q1: { A: ['Mastery', 'Core-Skill'], B: ['Advanced', 'Learning'], C: ['Building', 'Creation'], D: ['Teaching', 'Sharing'], E: ['Problem-Solving', 'Real-World'], F: ['Tools', 'Scale'], G: ['Mindset', 'Growth'], H: ['Innovation', 'Application'] },
  t2_q2: { A: ['Expertise', 'Technical'], B: ['Problem-Solving', 'Field'], C: ['Teaching', 'Explanation'], D: ['Advisory', 'Guidance'], E: ['Improvement', 'Performance'], F: ['Innovation', 'Creativity'], G: ['Planning', 'Structure'], H: ['Motivation', 'Support'] },
  t2_q3: { A: ['Mastery', 'Speed'], B: ['Analytical', 'Understanding'], C: ['Teaching', 'Clarity'], D: ['Creativity', 'Thinking'], E: ['Problem-Solving', 'Logic'], F: ['Connection', 'Networking'], G: ['Adaptability', 'Learning'], H: ['Initiative', 'Leadership'] },
  t2_q4: { A: ['Impact', 'Service'], B: ['Problem-Solving', 'Purpose'], C: ['Creation', 'Value'], D: ['Recognition', 'Expertise'], E: ['Purpose', 'Contribution'], F: ['Teaching', 'Guidance'], G: ['Legacy', 'Impact'], H: ['Growth', 'Mastery'] },
  t2_q5: { A: ['Teaching', 'Practical'], B: ['Application', 'Real-World'], C: ['Problem-Solving', 'Thinking'], D: ['Growth', 'Field'], E: ['Building', 'Technical'], F: ['Income', 'Skills'], G: ['Collaboration', 'Impact'], H: ['Discipline', 'Consistency'] },
  t2_q6: { A: ['Mastery', 'Skill'], B: ['Problem-Solving', 'Real'], C: ['Building', 'Creation'], D: ['Empathy', 'Impact'], E: ['Recognition', 'Excellence'], F: ['Teaching', 'Mentoring'], G: ['Team', 'Contribution'], H: ['Discipline', 'Growth'] },
  t3_q1: { A: ['Service', 'Freelancing'], B: ['Collaboration', 'Expertise'], C: ['Startup', 'Team'], D: ['Building', 'Project'], E: ['Teaching', 'Knowledge'], F: ['Problem-Solving', 'Experience'], G: ['Partnership', 'Collaboration'], H: ['Community', 'Contribution'] },
  t3_q2: { A: ['Problem-Solving', 'Service'], B: ['Expertise', 'Guidance'], C: ['Product', 'Building'], D: ['Knowledge', 'Teaching'], E: ['Efficiency', 'Speed'], F: ['Innovation', 'Creativity'], G: ['Tools', 'Systems'], H: ['Reliability', 'Execution'] },
  t3_q3: { A: ['Scale', 'Systems'], B: ['Improvement', 'Adaptability'], C: ['Niche', 'Strategy'], D: ['Collaboration', 'Team'], E: ['Validation', 'Proof'], F: ['Product', 'Platform'], G: ['Consistency', 'Discipline'], H: ['Mentoring', 'Guidance'] },
  t3_q4: { A: ['Proof', 'Validation'], B: ['Learning', 'Observation'], C: ['Market', 'Research'], D: ['Community', 'Learning'], E: ['Networking', 'Mentoring'], F: ['Research', 'Case-Studies'], G: ['Belief', 'Vision'], H: ['Uncertainty', 'Caution'] },
  t3_q5: { A: ['Problem-Solving', 'Value'], B: ['Efficiency', 'Speed'], C: ['Expertise', 'Guidance'], D: ['Tools', 'Systems'], E: ['Quality', 'Outcomes'], F: ['Innovation', 'Process'], G: ['Reliability', 'Execution'], H: ['Coaching', 'Guidance'] },
  t3_q6: { A: ['Building', 'Impact'], B: ['Problem-Solving', 'Real-World'], C: ['Service', 'Empathy'], D: ['Strategy', 'Planning'], E: ['Collaboration', 'Team'], F: ['Teaching', 'Mentoring'], G: ['Management', 'Scale'], H: ['Experimentation', 'Innovation'] },
  t4_q1: { A: ['Technical', 'Problem-Solving'], B: ['Teaching', 'Knowledge'], C: ['Mentoring', 'Guidance'], D: ['Creation', 'Value'], E: ['Simplification', 'Communication'], F: ['Support', 'Growth'], G: ['Networking', 'Connection'], H: ['Action', 'Execution'] },
  t4_q2: { A: ['Problem-Solving', 'Community'], B: ['Collaboration', 'Like-Minded'], C: ['Teaching', 'Content'], D: ['Building', 'Community'], E: ['Mentoring', 'Teaching'], F: ['Projects', 'Participation'], G: ['Opportunity', 'Creation'], H: ['Leadership', 'Organization'] },
  t4_q3: { A: ['Potential', 'Growth'], B: ['Access', 'Knowledge'], C: ['Efficiency', 'Systems'], D: ['Purpose', 'Meaning'], E: ['Problem-Solving', 'Solutions'], F: ['Courage', 'Action'], G: ['Collaboration', 'Support'], H: ['Growth', 'Opportunity'] },
  t4_q4: { A: ['Expertise', 'Sharing'], B: ['Problem-Solving', 'Impact'], C: ['Teaching', 'Guidance'], D: ['Building', 'Tools'], E: ['Motivation', 'Encouragement'], F: ['Opportunity', 'Creation'], G: ['Role-Model', 'Leadership'], H: ['Efficiency', 'Improvement'] },
  t4_q5: { A: ['Technical', 'Expertise'], B: ['Teaching', 'Explanation'], C: ['Problem-Solving', 'Value'], D: ['Building', 'Useful'], E: ['Wisdom', 'Experience'], F: ['Mentoring', 'Guidance'], G: ['Networking', 'Connections'], H: ['Efficiency', 'Systems'] },
  t4_q6: { A: ['Impact', 'Skills'], B: ['Growth', 'Improvement'], C: ['Problem-Solving', 'Purpose'], D: ['Building', 'Scale'], E: ['Action', 'Knowledge'], F: ['Teaching', 'Sharing'], G: ['Collaboration', 'Impact'], H: ['Change', 'Skills'] },
  t5_q1: { A: ['Systems', 'Efficiency'], B: ['Problem-Solving', 'Technical'], C: ['Tools', 'Empathy'], D: ['Innovation', 'Technology'], E: ['Optimization', 'Performance'], F: ['Teaching', 'Technical'], G: ['Product', 'Real-World'], H: ['Creativity', 'Technical'] },
  t5_q2: { A: ['Quality', 'Reliability'], B: ['Problem-Solving', 'Purpose'], C: ['Tools', 'Empathy'], D: ['Teaching', 'Mentoring'], E: ['Innovation', 'Boundaries'], F: ['Optimization', 'Systems'], G: ['Collaboration', 'Projects'], H: ['Documentation', 'Knowledge'] },
  t5_q3: { A: ['Code', 'Design'], B: ['Debugging', 'Technical'], C: ['Learning', 'Tools'], D: ['Teaching', 'Technical'], E: ['Building', 'Systems'], F: ['Performance', 'Optimization'], G: ['Documentation', 'Communication'], H: ['Collaboration', 'Technical'] },
  t5_q4: { A: ['AI', 'Innovation'], B: ['Cloud', 'DevOps'], C: ['Web', 'Mobile'], D: ['Security', 'Privacy'], E: ['Blockchain', 'Web3'], F: ['IoT', 'Connected'], G: ['AR', 'VR'], H: ['Green', 'Sustainable'] },
  t5_q5: { A: ['Education', 'Access'], B: ['Health', 'Care'], C: ['Environment', 'Sustainability'], D: ['Connection', 'People'], E: ['Automation', 'Efficiency'], F: ['Privacy', 'Security'], G: ['Decision', 'Data'], H: ['Experience', 'Design'] },
  t5_q6: { A: ['Impact', 'Purpose'], B: ['Challenge', 'Mastery'], C: ['Team', 'Collaboration'], D: ['Production', 'Real-World'], E: ['Learning', 'Growth'], F: ['Innovation', 'Building'], G: ['Mentoring', 'Junior'], H: ['Open-Source', 'Community'] },
  t6_q1: { A: ['Access', 'Technology'], B: ['Tools', 'Empowerment'], C: ['Efficiency', 'Industry'], D: ['Education', 'Skills'], E: ['Systems', 'Workplace'], F: ['Problem-Solving', 'Expertise'], G: ['Bridge', 'Users'], H: ['Open', 'Community'] },
  t6_q2: { A: ['Teaching', 'Developer'], B: ['Business', 'Small'], C: ['Service', 'Non-profit'], D: ['Creators', 'Builders'], E: ['Education', 'Learning'], F: ['Team', 'Technical'], G: ['Tools', 'Everyone'], H: ['Community', 'Resources'] },
  t6_q3: { A: ['Tools', 'Impact'], B: ['Education', 'Skills'], C: ['Problem-Solving', 'Technology'], D: ['Empowerment', 'Building'], E: ['Access', 'Knowledge'], F: ['Systems', 'Organization'], G: ['Solutions', 'Legacy'], H: ['Change', 'Skills'] },
  t6_q4: { A: ['Quality', 'Craft'], B: ['Innovation', 'Creativity'], C: ['Access', 'Inclusion'], D: ['Security', 'Privacy'], E: ['Efficiency', 'Performance'], F: ['Collaboration', 'Open-Source'], G: ['Simplicity', 'Elegance'], H: ['Impact', 'Usefulness'] },
  t6_q5: { A: ['Scale', 'Impact'], B: ['Open-Source', 'Community'], C: ['Global', 'Problem-Solving'], D: ['Empowerment', 'Creators'], E: ['Education', 'Platform'], F: ['Life-Saving', 'Systems'], G: ['Beauty', 'Design'], H: ['Business', 'Impact'] },
  t6_q6: { A: ['Impact', 'People'], B: ['Problem-Solving', 'Legacy'], C: ['Mentoring', 'Developers'], D: ['Open-Source', 'Community'], E: ['Innovation', 'Pioneering'], F: ['Systems', 'Lasting'], G: ['Knowledge', 'Sharing'], H: ['Change', 'Impact'] },
};

/* ═══════════════════════════════════════════════════════════════
   DAY WEIGHTS  — Days 5 & 6 have higher multipliers
═══════════════════════════════════════════════════════════════ */
const DAY_WEIGHTS = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1.6, 6: 1.8 };

/* ═══════════════════════════════════════════════════════════════
   IKIGAI CATEGORY BUCKETS
   Each trait maps to one of the 4 Ikigai dimensions
═══════════════════════════════════════════════════════════════ */
const IKIGAI_BUCKETS = {
  love: ['Creativity', 'Passion', 'Flow', 'Curiosity', 'Expression', 'Exploration', 'Art', 'Love', 'Inspiration', 'Storytelling', 'Vision', 'Energy', 'Authenticity', 'Mindset', 'Happiness', 'Culture', 'Harmony', 'Peace', 'Family', 'Connection', 'Community', 'Collaboration', 'Teamwork', 'Belonging', 'Adventure'],
  good: ['Analytical', 'Problem-Solving', 'Systems-Thinking', 'Technical', 'Execution', 'Discipline', 'Mastery', 'Consistency', 'Organization', 'Planning', 'Strategy', 'Communication', 'Logic', 'Practical', 'Adaptability', 'Learning', 'Innovation', 'Research', 'Advanced', 'Simplification', 'Iteration', 'Debugging', 'Documentation', 'Performance', 'Quality', 'Design', 'Data', 'Code', 'Architecture'],
  need: ['Empathy', 'Service', 'Mentoring', 'Teaching', 'Support', 'Access', 'Education', 'Health', 'Environment', 'Justice', 'Equality', 'Community-Impact', 'Sustainability', 'Mental-Health', 'Wellness', 'Social', 'Change', 'Impact', 'Purpose', 'Mission', 'Global', 'Opportunity-Creation', 'Diversity', 'Inclusion', 'Guidance'],
  paid: ['Entrepreneurship', 'Business', 'Market-Awareness', 'Freelancing', 'Startup', 'Scale', 'Efficiency', 'Value', 'Revenue', 'Product', 'Platform', 'Consulting', 'Advisory', 'Validation', 'Monetization', 'Digital', 'Income', 'Growth', 'Building', 'Creation', 'Transformation', 'Investment', 'Partnership', 'Leadership'],
};

/* ═══════════════════════════════════════════════════════════════
   PATTERN → ARCHETYPE DETECTION
═══════════════════════════════════════════════════════════════ */
const detectArchetype = (traitScores) => {
  const archetypes = [
    { name: 'The Creative Visionary',   color: '#8B5CF6', requires: ['Creativity', 'Vision', 'Innovation'], bonus: ['Storytelling', 'Inspiration'] },
    { name: 'The Empathetic Builder',   color: '#F43F5E', requires: ['Empathy', 'Building', 'Community'], bonus: ['Service', 'Teaching'] },
    { name: 'The Strategic Leader',     color: '#3B82F6', requires: ['Strategy', 'Leadership', 'Planning'], bonus: ['Execution', 'Business'] },
    { name: 'The Analytical Innovator', color: '#10B981', requires: ['Analytical', 'Innovation', 'Problem-Solving'], bonus: ['Technical', 'Systems-Thinking'] },
    { name: 'The Purpose-Driven Maker', color: '#F59E0B', requires: ['Purpose', 'Building', 'Impact'], bonus: ['Mission', 'Legacy'] },
    { name: 'The Teaching Catalyst',    color: '#EC4899', requires: ['Teaching', 'Empathy', 'Growth'], bonus: ['Mentoring', 'Community'] },
    { name: 'The Systems Architect',    color: '#6366F1', requires: ['Systems-Thinking', 'Execution', 'Efficiency'], bonus: ['Scale', 'Organization'] },
    { name: 'The Bold Entrepreneur',    color: '#EF4444', requires: ['Entrepreneurship', 'Courage', 'Action'], bonus: ['Innovation', 'Risk'] },
  ];

  const scores = archetypes.map(a => {
    let score = 0;
    a.requires.forEach(t => { score += (traitScores[t] || 0) * 2; });
    a.bonus.forEach(t => { score += (traitScores[t] || 0); });
    return { ...a, score };
  });

  scores.sort((a, b) => b.score - a.score);
  return scores[0];
};

/* ═══════════════════════════════════════════════════════════════
   MAIN TRAIT SCORING ENGINE
═══════════════════════════════════════════════════════════════ */
const computeTraitScores = (answers) => {
  const scores = {};

  [1, 2, 3, 4, 5, 6].forEach(day => {
    const dayWeight = DAY_WEIGHTS[day] || 1;
    Object.entries(answers[day] || {}).forEach(([questionId, obj]) => {
      const selectedAnswers = Array.isArray(obj?.answer) ? obj.answer : (obj?.answer ? [obj.answer] : []);
      const qMap = TRAIT_MAP[questionId];
      if (!qMap) return;

      /* find which option keys match the selected answer texts */
      Object.entries(qMap).forEach(([optionKey, traits]) => {
        const isSelected = selectedAnswers.some(ans => {
          /* match by option letter embedded in text, or direct include */
          return ans && (
            ans.startsWith(`${optionKey}.`) ||
            ans === optionKey
          );
        });
        /* fallback: check if any of the selected answers appears to match this option */
        /* We also store answers as full text, so use a frequency approach */
        if (isSelected) {
          traits.forEach(t => { scores[t] = (scores[t] || 0) + dayWeight; });
        }
      });

      /* ALSO score by answer text matching (since answers stored as strings) */
      selectedAnswers.forEach(ansText => {
        if (!ansText) return;
        Object.entries(qMap).forEach(([, traits]) => {
          /* every selected answer contributes partial trait score */
          traits.forEach(t => {
            scores[t] = (scores[t] || 0) + (dayWeight * 0.4);
          });
        });
      });
    });
  });

  return scores;
};

/* ═══════════════════════════════════════════════════════════════
   GROUP TRAIT SCORES INTO IKIGAI BUCKETS
═══════════════════════════════════════════════════════════════ */
const groupIntoIkigaiBuckets = (traitScores) => {
  const buckets = { love: [], good: [], need: [], paid: [] };

  Object.entries(traitScores).forEach(([trait, score]) => {
    let placed = false;
    for (const [bucket, traitList] of Object.entries(IKIGAI_BUCKETS)) {
      if (traitList.includes(trait)) {
        buckets[bucket].push({ trait, score });
        placed = true;
        break;
      }
    }
    if (!placed) buckets.good.push({ trait, score }); /* default to good */
  });

  /* sort each bucket by score descending, take top items */
  Object.keys(buckets).forEach(b => {
    buckets[b].sort((a, z) => z.score - a.score);
  });

  return buckets;
};

/* ═══════════════════════════════════════════════════════════════
   EXTRACT TOP KEYWORDS FOR DISPLAY
═══════════════════════════════════════════════════════════════ */
const getTopKeywords = (bucket, count = 5) =>
  bucket.slice(0, count).map(item => item.trait);

/* ═══════════════════════════════════════════════════════════════
   BUILD OVERLAP ANALYSIS
═══════════════════════════════════════════════════════════════ */
const buildOverlapInsights = (buckets) => {
  const loveSet = new Set(getTopKeywords(buckets.love, 8));
  const goodSet = new Set(getTopKeywords(buckets.good, 8));
  const needSet = new Set(getTopKeywords(buckets.need, 8));
  const paidSet = new Set(getTopKeywords(buckets.paid, 8));

  const passion    = [...loveSet].filter(x => goodSet.has(x));
  const profession = [...goodSet].filter(x => paidSet.has(x));
  const vocation   = [...paidSet].filter(x => needSet.has(x));
  const mission    = [...needSet].filter(x => loveSet.has(x));
  const ikigai     = [...loveSet].filter(x => goodSet.has(x) && needSet.has(x) && paidSet.has(x));

  return { passion, profession, vocation, mission, ikigai };
};

/* ═══════════════════════════════════════════════════════════════
   GENERATE IKIGAI SENTENCE
═══════════════════════════════════════════════════════════════ */
const buildIkigaiSentence = (archetype, buckets, overlaps) => {
  const loveWords  = getTopKeywords(buckets.love, 2).join(' and ');
  const goodWords  = getTopKeywords(buckets.good, 2).join(' and ');
  const needWords  = getTopKeywords(buckets.need, 2).join(' and ');
  const paidWords  = getTopKeywords(buckets.paid, 2).join(' and ');

  return `Your Ikigai lies in being ${archetype.name} — ` +
    `someone who thrives through ${loveWords || 'creative exploration'}, ` +
    `excels at ${goodWords || 'analytical problem-solving'}, ` +
    `serves the world's need for ${needWords || 'meaningful support'}, ` +
    `and creates real value through ${paidWords || 'skilled execution'}.`;
};

/* ═══════════════════════════════════════════════════════════════
   IKIGAI QUADRANT SUGGESTIONS
═══════════════════════════════════════════════════════════════ */
const buildQuadrantSuggestions = (buckets, overlaps) => ({
  passion: {
    keywords: getTopKeywords(buckets.love, 4),
    suggestion: overlaps.passion.length > 0
      ? `You thrive when combining ${overlaps.passion.slice(0, 2).join(' and ')}. Seek roles where this energy is central.`
      : 'Explore activities that energize you and identify what you naturally excel at.',
  },
  profession: {
    keywords: getTopKeywords(buckets.good, 4),
    suggestion: overlaps.profession.length > 0
      ? `Your ${overlaps.profession.slice(0, 2).join(' and ')} skills are highly marketable — look for specialist or consulting roles.`
      : 'Identify your most valuable skills and research how they translate to income.',
  },
  vocation: {
    keywords: getTopKeywords(buckets.need, 4),
    suggestion: overlaps.vocation.length > 0
      ? `The world needs your ${overlaps.vocation.slice(0, 2).join(' and ')} — consider purpose-driven ventures.`
      : 'Connect your skills to meaningful problems. What change do you want to see?',
  },
  mission: {
    keywords: getTopKeywords(buckets.love, 3),
    suggestion: overlaps.mission.length > 0
      ? `Your heart is drawn to ${overlaps.mission.slice(0, 2).join(' and ')} — find ways to combine passion with real-world impact.`
      : 'What issues make you emotional? That passion can fuel your mission.',
  },
  ikigai: {
    keywords: overlaps.ikigai.length > 0 ? overlaps.ikigai.slice(0, 4) : getTopKeywords(buckets.love, 2).concat(getTopKeywords(buckets.good, 2)),
    suggestion: overlaps.ikigai.length > 0
      ? `Your true calling involves ${overlaps.ikigai.slice(0, 2).join(' and ')} — this is where all your strengths align.`
      : 'Your Ikigai is crystallising. Keep exploring intersections of what you love, what you are great at, what the world needs, and what you can be paid for.',
  },
});

/* ═══════════════════════════════════════════════════════════════
   ACTION PATTERN (Day 5)
═══════════════════════════════════════════════════════════════ */
const day5Archetypes = {
  Executor: ['look for ways to turn passion into action', 'actively seek opportunities to pursue', 'take action', 'building or creating', 'experimenting with new ideas', 'lose track of time', 'take action with what you already know'],
  Planner: ['planning a project', 'researching how to start', 'learning productivity', 'strategy and planning', 'mapping out business', 'yes, if i build a strong system', 'yes, if i turn it into a scalable model', 'strategic planning', 'creating structure'],
  Starter: ['start before you feel ready', 'i get excited when discussing', 'i actively seek opportunities', 'joining a startup', 'solving a problem i\'ve personally', 'inspire others', 'taking a big risk', 'leading a team'],
  ConsistentPerformer: ['i naturally spend hours thinking', 'i constantly learn more', 'yes, if i stay consistent', 'consistency and discipline', 'how to stay consistent', 'yes, if i continuously improve', 'steady progress', 'disciplined'],
};

export const detectActionPattern = (selectedAnswers = []) => {
  const scores = { Executor: 0, Planner: 0, Starter: 0, ConsistentPerformer: 0 };
  selectedAnswers.forEach(answer => {
    if (!answer) return;
    const lc = answer.toLowerCase();
    Object.entries(day5Archetypes).forEach(([archetype, keywords]) => {
      keywords.forEach(kw => { if (lc.includes(kw.toLowerCase())) scores[archetype] += 1; });
    });
  });
  /* if no matches, score by length as fallback */
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) scores.Executor += 1;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { archetype: sorted[0][0], scores, traits: sorted.slice(0, 2).map(([n]) => n) };
};

/* ═══════════════════════════════════════════════════════════════
   MISSION PATTERN (Day 6)
═══════════════════════════════════════════════════════════════ */
const day6Archetypes = {
  ImpactCreator: ['solved a problem that affected millions', 'built something that changed lives', 'creating large-scale impact', 'solve a pressing global problem', 'build tools that make a difference', 'people whose lives i\'ve improved', 'empowered others'],
  PurposeDriven: ['making a real difference', 'turning my expertise into a meaningful mission', 'creating value for others', 'use your skills to create real impact', 'your skills can change lives', 'empowered others to find their path', 'compassion', 'integrity'],
  VisionBuilder: ['created systems that keep helping people', 'build something that outlives me', 'inspired a movement', 'build something bigger than yourself', 'creating lasting solutions', 'innovations i\'ve pioneered', 'legacy i\'ve created', 'building something that lasts'],
  GrowthSeeker: ['personal growth', 'overcoming challenges', 'growing personally', 'learning and discovery', 'growth and learning', 'collaborate to create greater impact', 'you can grow and improve', 'lifelong learner', 'people i\'ve helped grow'],
};

export const detectMissionPattern = (selectedAnswers = []) => {
  const scores = { ImpactCreator: 0, PurposeDriven: 0, VisionBuilder: 0, GrowthSeeker: 0 };
  selectedAnswers.forEach(answer => {
    if (!answer) return;
    const lc = answer.toLowerCase();
    Object.entries(day6Archetypes).forEach(([archetype, keywords]) => {
      keywords.forEach(kw => { if (lc.includes(kw.toLowerCase())) scores[archetype] += 1; });
    });
  });
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) scores.PurposeDriven += 1;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { archetype: sorted[0][0], scores, traits: sorted.slice(0, 2).map(([n]) => n) };
};

/* ═══════════════════════════════════════════════════════════════
   CENTER INSIGHT  (action × mission matrix)
═══════════════════════════════════════════════════════════════ */
const buildCenterInsight = ({ actionArchetype, missionArchetype }) => {
  const matrix = {
    'Executor-ImpactCreator':             { title: 'The Change Maker',         color: '#1D9E75' },
    'Executor-PurposeDriven':             { title: 'The Purposeful Doer',       color: '#534AB7' },
    'Executor-VisionBuilder':             { title: 'The Builder',               color: '#185FA5' },
    'Executor-GrowthSeeker':              { title: 'The Driven Achiever',       color: '#BA7517' },
    'Planner-ImpactCreator':              { title: 'The Strategic Innovator',   color: '#185FA5' },
    'Planner-PurposeDriven':              { title: 'The Architect',             color: '#534AB7' },
    'Planner-VisionBuilder':              { title: 'The Visionary Planner',     color: '#1D9E75' },
    'Planner-GrowthSeeker':               { title: 'The Systems Thinker',       color: '#BA7517' },
    'Starter-ImpactCreator':              { title: 'The Pioneer',               color: '#D85A30' },
    'Starter-PurposeDriven':              { title: 'The Catalyst',              color: '#993556' },
    'Starter-VisionBuilder':              { title: 'The Entrepreneur',          color: '#534AB7' },
    'Starter-GrowthSeeker':               { title: 'The Explorer',              color: '#BA7517' },
    'ConsistentPerformer-ImpactCreator':  { title: 'The Sustained Contributor', color: '#0F6E56' },
    'ConsistentPerformer-PurposeDriven':  { title: 'The Dedicated Creator',     color: '#534AB7' },
    'ConsistentPerformer-VisionBuilder':  { title: 'The Legacy Builder',        color: '#185FA5' },
    'ConsistentPerformer-GrowthSeeker':   { title: 'The Lifelong Learner',      color: '#BA7517' },
  };
  const actionStatements = {
    Executor:            'take consistent action and turn ideas into reality',
    Planner:             'design systems and structured paths to success',
    Starter:             'initiate boldly and inspire others to begin',
    ConsistentPerformer: 'build momentum through discipline and steady progress',
  };
  const missionStatements = {
    ImpactCreator:  "create measurable change that improves people's lives at scale",
    PurposeDriven:  'align everything you do with deep meaning and contribution',
    VisionBuilder:  'build systems and legacies that outlast your direct effort',
    GrowthSeeker:   'continuously grow and bring others along on that journey',
  };

  const key           = `${actionArchetype}-${missionArchetype}`;
  const archetypeInfo = matrix[key] || { title: 'The Purpose Seeker', color: '#534AB7' };
  const actionStmt    = actionStatements[actionArchetype]  || 'take meaningful action';
  const missionStmt   = missionStatements[missionArchetype] || 'leave the world better';

  return {
    ...archetypeInfo,
    actionStatement:  actionStmt,
    missionStatement: missionStmt,
    summary: `You are ${archetypeInfo.title} — someone who ${actionStmt} in service of a mission to ${missionStmt}.`,
  };
};

/* ═══════════════════════════════════════════════════════════════
   FLATTEN ANSWERS HELPER
═══════════════════════════════════════════════════════════════ */
const flattenAnswer = (raw) => {
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
};

/* ═══════════════════════════════════════════════════════════════
   CAREER PATHS BY ARCHETYPE + CATEGORY
═══════════════════════════════════════════════════════════════ */
const CAREER_PATHS = {
  entrepreneur: ['Startup Founder / Co-founder', 'Product Manager', 'Innovation Consultant', 'Business Strategist', 'Venture Builder'],
  managerial:   ['Operations Manager', 'Project Manager', 'Business Development Lead', 'Strategy Consultant', 'Team Lead / Department Head'],
  technician:   ['Software Engineer / Developer', 'Technical Architect', 'DevOps Engineer', 'Technical Product Manager', 'Solutions Architect'],
};

/* ═══════════════════════════════════════════════════════════════
   PROVIDER
═══════════════════════════════════════════════════════════════ */
export const IkigaiProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem('ikigai_category') || null
  );
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ikigai_answers') || '{}'); }
    catch { return {}; }
  });
  const [currentDay, setCurrentDay] = useState(() => {
    const s = localStorage.getItem('ikigai_current_day');
    return s ? parseInt(s) : 1;
  });
  const [completedDays, setCompletedDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ikigai_completed_days') || '[]'); }
    catch { return []; }
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ikigai_result') || 'null'); }
    catch { return null; }
  });

  useEffect(() => { if (selectedCategory) localStorage.setItem('ikigai_category', selectedCategory); }, [selectedCategory]);
  useEffect(() => { localStorage.setItem('ikigai_answers', JSON.stringify(answers)); }, [answers]);
  useEffect(() => { localStorage.setItem('ikigai_current_day', currentDay.toString()); }, [currentDay]);
  useEffect(() => { localStorage.setItem('ikigai_completed_days', JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { if (result) localStorage.setItem('ikigai_result', JSON.stringify(result)); }, [result]);

  const saveAnswer = (day, questionId, answer, type) => {
    setAnswers(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [questionId]: { answer, type, timestamp: new Date().toISOString() },
      },
    }));
  };

  const completeDay = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day].sort((a, b) => a - b));
    }
  };

  /* ── generateResult ─────────────────────────────────────────────── */
  const generateResult = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      /* 1. Compute weighted trait scores */
      const traitScores = computeTraitScores(answers);

      /* 2. Group into Ikigai buckets */
      const buckets = groupIntoIkigaiBuckets(traitScores);

      /* 3. Build overlap analysis */
      const overlaps = buildOverlapInsights(buckets);

      /* 4. Detect main archetype */
      const archetype = detectArchetype(traitScores);

      /* 5. Day 5 action + Day 6 mission patterns */
      const collectAnswers = (day) =>
        Object.values(answers[day] || {}).flatMap(obj => flattenAnswer(obj?.answer));

      const day5Answers  = collectAnswers(5);
      const day6Answers  = collectAnswers(6);
      const actionResult  = detectActionPattern(day5Answers);
      const missionResult = detectMissionPattern(day6Answers);

      /* 6. Center insight (action × mission matrix) */
      const centerInsight = buildCenterInsight({
        actionArchetype:  actionResult.archetype,
        missionArchetype: missionResult.archetype,
      });

      /* 7. Quadrant suggestions */
      const ikigaiSuggestion = buildQuadrantSuggestions(buckets, overlaps);

      /* 8. Raw grouped answers (answer texts) for display */
      const groupedAnswers = { love: [], good: [], need: [], paid: [] };
      [1, 2, 3, 4, 5, 6].forEach(day => {
        Object.values(answers[day] || {}).forEach(obj => {
          const texts = flattenAnswer(obj?.answer);
          const typeMap = { skills: 'good', money: 'paid', mission: 'love', love: 'love', good: 'good', need: 'need', paid: 'paid' };
          const target = typeMap[obj?.type] || 'love';
          texts.forEach(t => { if (t && groupedAnswers[target]) groupedAnswers[target].push(t); });
        });
      });

      /* 9. Ikigai sentence */
      const summary = buildIkigaiSentence(archetype, buckets, overlaps);

      /* 10. Top traits per bucket for chart display */
      const topTraits = {
        love: getTopKeywords(buckets.love, 6),
        good: getTopKeywords(buckets.good, 6),
        need: getTopKeywords(buckets.need, 6),
        paid: getTopKeywords(buckets.paid, 6),
      };

      setResult({
        groupedAnswers,
        topTraits,
        traitScores,
        buckets: {
          love: buckets.love.slice(0, 6),
          good: buckets.good.slice(0, 6),
          need: buckets.need.slice(0, 6),
          paid: buckets.paid.slice(0, 6),
        },
        overlaps,
        ikigaiSuggestion,
        summary,
        archetype,
        actionResult,
        missionResult,
        centerInsight,
        careerPath: CAREER_PATHS[selectedCategory] || CAREER_PATHS.entrepreneur,
        generatedAt: new Date().toISOString(),
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  const resetJourney = () => {
    setSelectedCategory(null);
    setAnswers({});
    setCurrentDay(1);
    setCompletedDays([]);
    setResult(null);
    ['ikigai_category', 'ikigai_answers', 'ikigai_current_day', 'ikigai_completed_days', 'ikigai_result']
      .forEach(k => localStorage.removeItem(k));
  };

  return (
    <IkigaiContext.Provider value={{
      selectedCategory, setSelectedCategory,
      answers, saveAnswer,
      currentDay, setCurrentDay,
      completedDays, completeDay,
      generateResult, result, isAnalyzing,
      resetJourney,
    }}>
      {children}
    </IkigaiContext.Provider>
  );
};