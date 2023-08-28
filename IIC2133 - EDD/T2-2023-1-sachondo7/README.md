[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/W1RG9Hjf)
# Tarea 2 2023-1

Recuerda subir el código de tu tarea en este repositorio a más tardar el día de la entrega a las 23:59 hrs.

## Compilar

```
make
```

## Recompilar

```
make clean && make
```

## Parte 1

```
./mateconhuesillo input.txt output.txt
```

## Comparar respuesta

Para esto les subimos un script de Python que les permite comparar su respuesta con la respuesta correcta. Para ejecutarlo, deben tener instalado Python 3.6 o superior:
```
python tests/hashing/check_output.py correc_output.txt student_output.txt
```

## Parte 2

```
./matechess input.txt output.txt
```

## Comparar respuesta

```
diff -b correct_output.txt student_output.txt
```


## Para revisar servidor

En algunos días se subirán testcases al servidor para que puedas probar tu tarea.

- Para revisar los _test publicos_ en el servidor del curso se tiene que acceder al siguiente [link](http://edd.ing.puc.cl/test?repo=T2-2023-1-sachondo7)

- Para revisar los _test de evaluacion_ en el servidor del curso se tiene que acceder al siguiente [link](http://edd.ing.puc.cl/grade?repo=T2-2023-1-sachondo7)

**Tiene que remplazar *USERNAME* por su usuario de github**

## Referencias de Código

### Para la implementacion de tablas de hash 
https://github.com/IIC2133-PUC/Talleres/tree/master/hashing/hashtable/src/hashing

### Para una función que me retorne el siguiente número primo.
https://parzibyte.me/blog/2019/07/12/numero-primo-c/

###
Ademas aclarar que usé chatGPT y github copilot para hacer mi tarea.
