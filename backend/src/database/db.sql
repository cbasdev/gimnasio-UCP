-- Creación de la base de datos
create database gimnasioUCP;

-- Creacion de la tabla administrador
create table admin(
  id_admin serial primary key,
  name_admin varchar(45),
  email varchar(45) UNIQUE,
  password varchar(250)
);

-- Creación de la tabla gimnasio
create table gym(
  id_gym serial primary key,
  name_gym varchar(45)
);

-- Creación de la tabla usuario
create table user_gym(
  id_user serial primary key,
  name_user varchar(45),
  dni varchar(45) UNIQUE,
  date_in varchar(45),
  last_date_in varchar(45),
  acumulated_suscription varchar(45)
);  

-- Creación de la tabla recurso
create table resource(
  id_resource serial primary key,
	reference varchar(45),
  name_resource varchar(45),
  description varchar(135)
);

-- Relacionando recursos con gimnasio
alter table resource
add id_gym integer not null;

alter table resource
add foreign key (id_gym) references gym(id_gym);

-- Relacionando Admin con gimnasio
alter table admin
add id_gym integer not null;

alter table admin
add foreign key (id_gym) references gym(id_gym);

-- Relacionando User con Gimnasio
alter table user_gym
add id_gym integer not null;

alter table user_gym
add foreign key (id_gym) references gym(id_gym);


-- El proyecto es escalable a mas gimnasios, pero 
-- Gimnacio UCP tendra el id 1
insert into gym (name_gym) values ('JOSE SPORT GYM');


