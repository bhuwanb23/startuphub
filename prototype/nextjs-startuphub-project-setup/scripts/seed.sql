-- StartupHub seed content (idempotent)
TRUNCATE ecosystem_stats, startups, opportunities, market_sectors RESTART IDENTITY;

INSERT INTO ecosystem_stats (label, value, decimals, prefix, suffix, subtext, sort_order) VALUES
  ('Startups synced',        10,   0, '',   'K+',  'across 24 sectors',          1),
  ('Incubators & programs',  450,  0, '',   '+',   'verified partners',          2),
  ('Active mentors',         2.8,  1, '',   'K+',  'operators & founders',       3),
  ('Capital connected',      1.2,  1, '₹',  'K Cr','tracked across stages',      4),
  ('Ecosystem connections',  68,   0, '',   'K+',  'and counting',               5);

INSERT INTO startups (name, sector, stage, location, description, traction, mark, featured, sort_order) VALUES
  ('Averia Health', 'AI · Healthcare', 'Series A', 'Bengaluru',
   'Clinical intelligence that reads radiology scans in seconds, now live in 140 diagnostic centres.',
   '₹38 Cr ARR · 3 patents', 'Av', true, 1),
  ('Finlattice', 'FinTech', 'Seed', 'Mumbai',
   'Embedded credit rails for tier-2 MSMEs with instant underwriting.',
   '2.1L merchants onboarded', 'Fi', false, 2),
  ('Terragrid', 'ClimateTech', 'Series A', 'Pune',
   'Satellite-driven soil-carbon MRV powering verified farm credits.',
   '1.4M hectares mapped', 'Tg', false, 3),
  ('Qwron', 'DeepTech', 'Incubated', 'Hyderabad',
   'Photonic chip interconnects spun out of a national research lab.',
   '2 design wins · 11 filings', 'Qw', false, 4);

INSERT INTO opportunities (kind, title, org, meta, deadline, sort_order) VALUES
  ('Funding',    'Seed Ignition Grant — cohort 07',        'StartupHub Capital Network',            'Up to ₹40 L · equity-free',          'Closes Mar 28',     1),
  ('Incubation', 'DeepTech Residency, Spring 2026',        'National Research Innovation Park',     '6 months · lab access + mentorship', 'Rolling',           2),
  ('Challenge',  'AgriChain Innovation Challenge',         'Dept. of Agriculture & Farmers Welfare','₹1 Cr prize pool · pilot guaranteed','Closes Apr 12',     3),
  ('Funding',    'Climate Pre-Series A Syndicate',         'Meridian Angels + StartupHub',          '₹2–6 Cr cheques',                    'Open investments',  4),
  ('Incubation', 'Zero-to-MVP Sprint — women founders',    'StartupHub Studios',                    '8 weeks · 40 seats',                 'Closes Apr 02',     5),
  ('Challenge',  'Urban Mobility Data Sprint',             'Smart City Mission, Pune',              'Paid PoC · city datasets',           'Closes May 05',     6);

INSERT INTO market_sectors (slug, name, market_size, growth, active_startups, insight, sparkline, trends, emerging, investment, ip, sort_order) VALUES
  ('ai-agritech', 'AI & Agritech', '$42.8B', '+18.4%', 1284,
   'Precision-agri platforms are consolidating around farm-gate data, while AI-native crop diagnostics pull fresh capital upstream.',
   '[22,26,24,31,34,32,39,44,41,52,58,64]',
   '["Farm-gate data infrastructure becomes the new moat","AI diagnostics move from pilots to paid contracts","Climate-linked insurance bundles gain distribution"]',
   '[{"name":"CropLens AI","stage":"Seed"},{"name":"Mandiverse","stage":"Series A"},{"name":"SoilSense Labs","stage":"Pre-seed"}]',
   '{"deals":96,"median":"$1.8M","qoq":"+22%"}',
   '{"filings":214,"grants":61,"categories":[{"label":"Computer vision","pct":46},{"label":"IoT sensing","pct":32},{"label":"Supply chain","pct":22}]}', 1),
  ('fintech', 'FinTech', '$31.5B', '+12.1%', 2211,
   'Embedded credit and cross-border B2B rails are absorbing most early-stage capital as consumer neobanking cools.',
   '[48,44,46,42,47,51,49,55,53,58,57,62]',
   '["Embedded lending outpaces standalone neobanks","Account-aggregator data unlocks MSME underwriting","Cross-border B2B payments see margin compression"]',
   '[{"name":"LedgerPort","stage":"Seed"},{"name":"Kaarobar Credit","stage":"Series A"},{"name":"SettleX","stage":"Seed"}]',
   '{"deals":183,"median":"$2.6M","qoq":"+9%"}',
   '{"filings":146,"grants":38,"categories":[{"label":"Risk engines","pct":41},{"label":"Payment rails","pct":37},{"label":"Compliance","pct":22}]}', 2),
  ('climatetech', 'ClimateTech', '$18.9B', '+26.7%', 947,
   'Carbon MRV, battery second-life and industrial heat-pumps are the fastest-compounding niches this quarter.',
   '[12,15,14,19,23,21,28,26,33,38,42,51]',
   '["MRV standards converge, unlocking carbon credit liquidity","Battery recycling capacity races to meet 2027 supply gap","Industrial decarbonisation pilots convert to orders"]',
   '[{"name":"Verdant Grid","stage":"Pre-seed"},{"name":"ReJoule Energy","stage":"Seed"},{"name":"CarbonKart","stage":"Seed"}]',
   '{"deals":58,"median":"$1.4M","qoq":"+31%"}',
   '{"filings":189,"grants":54,"categories":[{"label":"Energy storage","pct":44},{"label":"Carbon tech","pct":33},{"label":"Efficiency","pct":23}]}', 3),
  ('healthtech', 'HealthTech', '$27.2B', '+15.9%', 1576,
   'AI-led diagnostics and hospital ops software dominate dealflow; regulated-device startups see longer but deeper rounds.',
   '[30,33,31,36,34,40,43,41,48,47,54,59]',
   '["Radiology AI reaches reimbursement maturity","Hospital command centres adopt ops copilots","Rural tele-clinics scale via hub-and-spoke models"]',
   '[{"name":"PathPilot","stage":"Series A"},{"name":"SehatGrid","stage":"Seed"},{"name":"NeuroNest","stage":"Pre-seed"}]',
   '{"deals":121,"median":"$2.1M","qoq":"+14%"}',
   '{"filings":262,"grants":87,"categories":[{"label":"Diagnostics","pct":48},{"label":"Devices","pct":29},{"label":"Care delivery","pct":23}]}', 4);
