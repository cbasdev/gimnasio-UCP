-- Creación de la base de datos
create database gimnasioUCP;

-- Creacion de la tabla administrador
create table admin(
  id_admin serial primary key,
  name_admin varchar(45),
  email varchar(45),
  password varchar(45)
);

-- Creación de la tabla gimnasio
create table gym(
  id_gym serial primary key,
  name_gym varchar(45)
);

-- La relacion entre administrador y gimnasio es muchos a muchos, por lo tanto requiere una tabla adicional llamada contrato
create table contract(
  id_gym integer,
  id_admin integer
);

-- Relacionamos las llaves foráneas
alter table contract
add foreign key (id_gym) references gym(id_gym);
alter table contract
add foreign key (id_admin) references admin(id_admin);

-- Indicamos que son primarias para evitar repetir
alter table contract
add primary key (id_admin, id_gym);

-- Ejemplo de insertar datos
insert into admin (name_admin, email, password) values ('sebastian', 'sebas@gmail.com', '123123');
insert into admin (name_admin, email, password) values ('david', 'david@gmail.com', '123123');
insert into admin (name_admin, email, password) values ('juan', 'juan@gmail.com', '123123');

insert into gym (name_gym) values ('bodytec');
insert into gym (name_gym) values ('gymUCP');

insert into contract values (2, 1);
insert into contract values (2, 2);
insert into contract values (2, 3);

create table resource(
  id_resource serial primary key,
  name_resource varchar(45)
);

alter table resource
add id_gym integer;

alter table resource
add foreign key (id_gym) references gym(id_gym);