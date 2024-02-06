-- Task 2 ranks country orgins of bands, ordered by the
-- number of fans in each country.
SELECT origin, SUM(fans) AS nb_fans
FROM metal_bands
GROUP BY origin
ORDER BY nb_fans DESC;
