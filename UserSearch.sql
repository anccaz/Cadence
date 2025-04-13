use Users;

DECLARE @GeneralSearchTerm NVARCHAR(100) = 'string';  -- User input for musicPref
DECLARE @SpecificSearchTerm NVARCHAR(100) = 'violin'; -- User input for musicSpecPref

SELECT 
userId,
username,
musicpref,
musicSpecPref,
	case --scoring logic
		-- Exact match in both fields (highest score)
        WHEN musicPref LIKE '%' + @GeneralSearchTerm + '%' AND musicSpecPref LIKE '%' + @SpecificSearchTerm + '%' THEN 100
		-- Match in general preference only
		when musicPref like '%' + @GeneralSearchTerm + '%' then 50 -- partial match
		else 0 -- no match
	end as RelevanceScore, -- this names this action
	case
		when musicPref like '%' + @GeneralSearchTerm + '%' and musicSpecPref like '%' + @SpecificSearchTerm + '%' then 'Exact phrase match in name' -- exacte match of preferences
		when musicPref like '%' + @GeneralSearchTerm + '%' then 'Single keyword in General Music Prefenace' -- partial match
		else 'No matches at all' -- no match
	end as MatchType

FROM UserTable 
WHERE
	musicpref like '%' + @GeneralSearchTerm + '%' or --Match 'string' in pref
	musicSpecpref like '%' + @SpecificSearchTerm + '%'

order by
	RelevanceScore Desc, -- matches high score 1st
	musicpref asc;	