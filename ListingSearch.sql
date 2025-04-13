USE Listings;

DECLARE @SearchInstrument NVARCHAR(100) = 'guitar';  -- User input for SearchInstrument
DECLARE @SpecificGenre NVARCHAR(100) = 'vocaloid'; -- User input for SpecificGenre

SELECT 
    listid,
    listingCreator,
    songName,
    songGenre,
    CASE -- Scoring logic
        -- Exact match in songName and any position field (highest score)
        WHEN songGenre LIKE '%' + @SpecificGenre + '%' AND (
            pos1 LIKE '%' + @SearchInstrument + '%' OR
            pos2 LIKE '%' + @SearchInstrument + '%' OR
            pos3 LIKE '%' + @SearchInstrument + '%' OR
            pos4 LIKE '%' + @SearchInstrument + '%' OR
            pos5 LIKE '%' + @SearchInstrument + '%' OR
            pos6 LIKE '%' + @SearchInstrument + '%' OR
            pos7 LIKE '%' + @SearchInstrument + '%' OR
            pos8 LIKE '%' + @SearchInstrument + '%' OR
            pos9 LIKE '%' + @SearchInstrument + '%'
        ) THEN 100
        -- Match in songName only
        WHEN songGenre LIKE '%' + @SpecificGenre + '%' THEN 50
        -- Match in any position field only
        WHEN (
            pos1 LIKE '%' + @SearchInstrument + '%' OR
            pos2 LIKE '%' + @SearchInstrument + '%' OR
            pos3 LIKE '%' + @SearchInstrument + '%' OR
            pos4 LIKE '%' + @SearchInstrument + '%' OR
            pos5 LIKE '%' + @SearchInstrument + '%' OR
            pos6 LIKE '%' + @SearchInstrument + '%' OR
            pos7 LIKE '%' + @SearchInstrument + '%' OR
            pos8 LIKE '%' + @SearchInstrument + '%' OR
            pos9 LIKE '%' + @SearchInstrument + '%'
        ) THEN 50
        ELSE 0 -- No match
    END AS RelevanceScore,
    CASE
        WHEN songGenre LIKE '%' + @SpecificGenre + '%' AND (
            pos1 LIKE '%' + @SearchInstrument + '%' OR
            pos2 LIKE '%' + @SearchInstrument + '%' OR
            pos3 LIKE '%' + @SearchInstrument + '%' OR
            pos4 LIKE '%' + @SearchInstrument + '%' OR
            pos5 LIKE '%' + @SearchInstrument + '%' OR
            pos6 LIKE '%' + @SearchInstrument + '%' OR
            pos7 LIKE '%' + @SearchInstrument + '%' OR
            pos8 LIKE '%' + @SearchInstrument + '%' OR
            pos9 LIKE '%' + @SearchInstrument + '%'
        ) THEN 'Exact match in song name and position fields'
        -- Match in any position field only
        WHEN 
            pos1 LIKE '%' + @SearchInstrument + '%' OR
            pos2 LIKE '%' + @SearchInstrument + '%' OR
            pos3 LIKE '%' + @SearchInstrument + '%' OR
            pos4 LIKE '%' + @SearchInstrument + '%' OR
            pos5 LIKE '%' + @SearchInstrument + '%' OR
            pos6 LIKE '%' + @SearchInstrument + '%' OR
            pos7 LIKE '%' + @SearchInstrument + '%' OR
            pos8 LIKE '%' + @SearchInstrument + '%' OR
            pos9 LIKE '%' + @SearchInstrument + '%'
         THEN 'Match in one or more position fields'
        ELSE 'No matches found'
    END AS MatchType
FROM ListingTable
WHERE
    songGenre LIKE '%' + @SpecificGenre + '%' OR
	pos1 LIKE '%' + @SearchInstrument + '%' OR
    pos2 LIKE '%' + @SearchInstrument + '%' OR
    pos3 LIKE '%' + @SearchInstrument + '%' OR
    pos4 LIKE '%' + @SearchInstrument + '%' OR
    pos5 LIKE '%' + @SearchInstrument + '%' OR
    pos6 LIKE '%' + @SearchInstrument + '%' OR
    pos7 LIKE '%' + @SearchInstrument + '%' OR
    pos8 LIKE '%' + @SearchInstrument + '%' OR
    pos9 LIKE '%' + @SearchInstrument + '%'
ORDER BY
    RelevanceScore DESC,
    songGenre ASC;