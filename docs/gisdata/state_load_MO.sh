TMPDIR="${HOME}/Desktop/gisdata/temp/"
UNZIPTOOL=unzip
WGETTOOL="/opt/local/bin/wget"
export PGBIN=/opt/local/lib/postgresql18/bin
export PGPORT=5432
export PGHOST=localhost
export PGUSER=yanfuzhou
export PGPASSWORD="Zyf860624;"
export PGDATABASE=yanfuzhou
PSQL=${PGBIN}/psql
SHP2PGSQL=/opt/local/lib/postgresql17/bin/shp2pgsql
cd ${HOME}/Desktop/gisdata

cd ${HOME}/Desktop/gisdata
wget https://www2.census.gov/geo/tiger/TIGER2025/PLACE/tl_2025_29_place.zip --mirror --reject=html
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/PLACE
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2025_29*_place.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_place(CONSTRAINT pk_MO_place PRIMARY KEY (plcidfp) ) INHERITS(tiger.place);" 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2025_29_place.dbf tiger_staging.mo_place | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.MO_place RENAME geoid TO plcidfp;SELECT loader_load_staged_data(lower('MO_place'), lower('MO_place')); ALTER TABLE tiger_data.MO_place ADD CONSTRAINT uidx_MO_place_gid UNIQUE (gid);"
${PSQL} -c "CREATE INDEX idx_MO_place_soundex_name ON tiger_data.MO_place USING btree (soundex(name));"
${PSQL} -c "CREATE INDEX tiger_data_MO_place_the_geom_gist ON tiger_data.MO_place USING gist(the_geom);"
${PSQL} -c "ALTER TABLE tiger_data.MO_place ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
cd ${HOME}/Desktop/gisdata
wget https://www2.census.gov/geo/tiger/TIGER2025/COUSUB/tl_2025_29_cousub.zip --mirror --reject=html
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/COUSUB
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2025_29*_cousub.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_cousub(CONSTRAINT pk_MO_cousub PRIMARY KEY (cosbidfp), CONSTRAINT uidx_MO_cousub_gid UNIQUE (gid)) INHERITS(tiger.cousub);" 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2025_29_cousub.dbf tiger_staging.mo_cousub | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.MO_cousub RENAME geoid TO cosbidfp;SELECT loader_load_staged_data(lower('MO_cousub'), lower('MO_cousub')); ALTER TABLE tiger_data.MO_cousub ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "CREATE INDEX tiger_data_MO_cousub_the_geom_gist ON tiger_data.MO_cousub USING gist(the_geom);"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_cousub_countyfp ON tiger_data.MO_cousub USING btree(countyfp);"
cd ${HOME}/Desktop/gisdata
wget https://www2.census.gov/geo/tiger/TIGER2025/TRACT/tl_2025_29_tract.zip --mirror --reject=html
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/TRACT
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2025_29*_tract.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_tract(CONSTRAINT pk_MO_tract PRIMARY KEY (tract_id) ) INHERITS(tiger.tract); " 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2025_29_tract.dbf tiger_staging.mo_tract | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.MO_tract RENAME geoid TO tract_id; SELECT loader_load_staged_data(lower('MO_tract'), lower('MO_tract')); "
	${PSQL} -c "CREATE INDEX tiger_data_MO_tract_the_geom_gist ON tiger_data.MO_tract USING gist(the_geom);"
	${PSQL} -c "VACUUM ANALYZE tiger_data.MO_tract;"
	${PSQL} -c "ALTER TABLE tiger_data.MO_tract ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
cd ${HOME}/Desktop/gisdata
wget https://www2.census.gov/geo/tiger/TIGER2025/TABBLOCK20/tl_2025_29_tabblock20.zip --mirror --reject=html
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/TABBLOCK20
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_2025_29*_tabblock20.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_tabblock20(CONSTRAINT pk_MO_tabblock20 PRIMARY KEY (geoid)) INHERITS(tiger.tabblock20);" 
${SHP2PGSQL} -D -c -s 4269 -g the_geom   -W "latin1" tl_2025_29_tabblock20.dbf tiger_staging.mo_tabblock20 | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('MO_tabblock20'), lower('MO_tabblock20')); "
${PSQL} -c "ALTER TABLE tiger_data.MO_tabblock20 ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "CREATE INDEX tiger_data_MO_tabblock20_the_geom_gist ON tiger_data.MO_tabblock20 USING gist(the_geom);"
${PSQL} -c "vacuum analyze tiger_data.MO_tabblock20;"
cd ${HOME}/Desktop/gisdata
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/FACES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_29*_faces*.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_faces(CONSTRAINT pk_MO_faces PRIMARY KEY (gid)) INHERITS(tiger.faces);" 
for z in *faces*.dbf; do
${SHP2PGSQL} -D   -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.MO_faces | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('MO_faces'), lower('MO_faces'));"
done

${PSQL} -c "CREATE INDEX tiger_data_MO_faces_the_geom_gist ON tiger_data.MO_faces USING gist(the_geom);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_MO_faces_tfid ON tiger_data.MO_faces USING btree (tfid);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_MO_faces_countyfp ON tiger_data.MO_faces USING btree (countyfp);"
	${PSQL} -c "ALTER TABLE tiger_data.MO_faces ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
	${PSQL} -c "vacuum analyze tiger_data.MO_faces;"
cd ${HOME}/Desktop/gisdata
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/FEATNAMES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_29*_featnames*.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_featnames(CONSTRAINT pk_MO_featnames PRIMARY KEY (gid)) INHERITS(tiger.featnames);ALTER TABLE tiger_data.MO_featnames ALTER COLUMN statefp SET DEFAULT '29';" 
for z in *featnames*.dbf; do
${SHP2PGSQL} -D   -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.MO_featnames | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('MO_featnames'), lower('MO_featnames'));"
done

${PSQL} -c "CREATE INDEX idx_tiger_data_MO_featnames_snd_name ON tiger_data.MO_featnames USING btree (soundex(name));"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_featnames_lname ON tiger_data.MO_featnames USING btree (lower(name));"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_featnames_tlid_statefp ON tiger_data.MO_featnames USING btree (tlid,statefp);"
${PSQL} -c "ALTER TABLE tiger_data.MO_featnames ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "vacuum analyze tiger_data.MO_featnames;"
cd ${HOME}/Desktop/gisdata
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/EDGES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_29*_edges*.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_edges(CONSTRAINT pk_MO_edges PRIMARY KEY (gid)) INHERITS(tiger.edges);"
for z in *edges*.dbf; do
${SHP2PGSQL} -D   -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.MO_edges | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('MO_edges'), lower('MO_edges'));"
done

${PSQL} -c "ALTER TABLE tiger_data.MO_edges ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_edges_tlid ON tiger_data.MO_edges USING btree (tlid);"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_edgestfidr ON tiger_data.MO_edges USING btree (tfidr);"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_edges_tfidl ON tiger_data.MO_edges USING btree (tfidl);"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_edges_countyfp ON tiger_data.MO_edges USING btree (countyfp);"
${PSQL} -c "CREATE INDEX tiger_data_MO_edges_the_geom_gist ON tiger_data.MO_edges USING gist(the_geom);"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_edges_zipl ON tiger_data.MO_edges USING btree (zipl);"
${PSQL} -c "CREATE TABLE tiger_data.MO_zip_state_loc(CONSTRAINT pk_MO_zip_state_loc PRIMARY KEY(zip,stusps,place)) INHERITS(tiger.zip_state_loc);"
${PSQL} -c "INSERT INTO tiger_data.MO_zip_state_loc(zip,stusps,statefp,place) SELECT DISTINCT e.zipl, 'MO', '29', p.name FROM tiger_data.MO_edges AS e INNER JOIN tiger_data.MO_faces AS f ON (e.tfidl = f.tfid OR e.tfidr = f.tfid) INNER JOIN tiger_data.MO_place As p ON(f.statefp = p.statefp AND f.placefp = p.placefp ) WHERE e.zipl IS NOT NULL;"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_zip_state_loc_place ON tiger_data.MO_zip_state_loc USING btree(soundex(place));"
${PSQL} -c "ALTER TABLE tiger_data.MO_zip_state_loc ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "vacuum analyze tiger_data.MO_edges;"
${PSQL} -c "vacuum analyze tiger_data.MO_zip_state_loc;"
${PSQL} -c "CREATE TABLE tiger_data.MO_zip_lookup_base(CONSTRAINT pk_MO_zip_state_loc_city PRIMARY KEY(zip,state, county, city, statefp)) INHERITS(tiger.zip_lookup_base);"
${PSQL} -c "INSERT INTO tiger_data.MO_zip_lookup_base(zip,state,county,city, statefp) SELECT DISTINCT e.zipl, 'MO', c.name,p.name,'29'  FROM tiger_data.MO_edges AS e INNER JOIN tiger.county As c  ON (e.countyfp = c.countyfp AND e.statefp = c.statefp AND e.statefp = '29') INNER JOIN tiger_data.MO_faces AS f ON (e.tfidl = f.tfid OR e.tfidr = f.tfid) INNER JOIN tiger_data.MO_place As p ON(f.statefp = p.statefp AND f.placefp = p.placefp ) WHERE e.zipl IS NOT NULL;"
${PSQL} -c "ALTER TABLE tiger_data.MO_zip_lookup_base ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
${PSQL} -c "CREATE INDEX idx_tiger_data_MO_zip_lookup_base_citysnd ON tiger_data.MO_zip_lookup_base USING btree(soundex(city));"
cd ${HOME}/Desktop/gisdata
cd ${HOME}/Desktop/gisdata/www2.census.gov/geo/tiger/TIGER2025/ADDR/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_29*_addr*.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.MO_addr(CONSTRAINT pk_MO_addr PRIMARY KEY (gid)) INHERITS(tiger.addr);ALTER TABLE tiger_data.MO_addr ALTER COLUMN statefp SET DEFAULT '29';" 
for z in *addr*.dbf; do
${SHP2PGSQL} -D   -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.MO_addr | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('MO_addr'), lower('MO_addr'));"
done

${PSQL} -c "ALTER TABLE tiger_data.MO_addr ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
	${PSQL} -c "CREATE INDEX idx_tiger_data_MO_addr_least_address ON tiger_data.MO_addr USING btree (least_hn(fromhn,tohn) );"
	${PSQL} -c "CREATE INDEX idx_tiger_data_MO_addr_tlid_statefp ON tiger_data.MO_addr USING btree (tlid, statefp);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_MO_addr_zip ON tiger_data.MO_addr USING btree (zip);"
	${PSQL} -c "CREATE TABLE tiger_data.MO_zip_state(CONSTRAINT pk_MO_zip_state PRIMARY KEY(zip,stusps)) INHERITS(tiger.zip_state); "
	${PSQL} -c "INSERT INTO tiger_data.MO_zip_state(zip,stusps,statefp) SELECT DISTINCT zip, 'MO', '29' FROM tiger_data.MO_addr WHERE zip is not null;"
	${PSQL} -c "ALTER TABLE tiger_data.MO_zip_state ADD CONSTRAINT chk_statefp CHECK (statefp = '29');"
	${PSQL} -c "vacuum analyze tiger_data.MO_addr;"
