-- Run once in the Neon SQL Editor.
create table if not exists feedback (
  id           uuid primary key default gen_random_uuid(),
  course_name  text        not null default 'Gen AI Accelerator 2.0',
  full_name    text        not null,
  company      text        not null,
  rating       integer     not null check (rating between 1 and 5),
  testimonial  text        not null,
  created_at   timestamptz not null default now()
);

create index if not exists feedback_created_at_idx on feedback (created_at desc);
