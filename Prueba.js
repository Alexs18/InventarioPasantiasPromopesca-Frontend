SELECT        num_guia, fecha_guia, fecchaRegIng, obs_guia, num_guiamp, fecha_guiamp, dia_produccion, anio_produccion, idot, codigo_ordentrabajo, id_proveedor, viaje_ordentrabajo, año_ordentrabajo, codigo_proveedor, 
                         nombre_proveedor, id_tipo_miga, nombre_tipo_miga, tipo, idcliente, FechaInicio_op, Id_Cliente, FechaFin_op, Nombre_op, id_pais, Contrato_op, id_op_estado, Nombre_Cliente, Dir_Cliente, Telf_Cliente, 
                         Tipo_Cliente, Ciudad, idOP, tipodespacho, observaciones, estado, tipoRTP, nombre, numero, estadoRTP, idRTP, id_tipo_congelamiento, cajas, kg, nombre_tipo_congelamiento, iditem, nombre_items, 
                         Peso_Unidad, idDetguiaIngreso, codigo, tipoDoc, propietario, nombredoc, secuencia_inicial, Id_Items_Grupo, impredoc, idOrigenPT, nombreOrigen, Nombre_Items_Grupo, id_tipodoc, id_guia, estadoguia, 
                         id_guia_Ing_pt, nombre_especie, abrevia_especie, Nombre_Items_Talla, id_detalle_op, fecha_produccion, Fecha_produccion_guia_ingreso, Nombre_Items_Tipos, Nombre_Items_Tipo_Limpieza, Obs_Calidad, 
                         estado_calidad, tipo_venta, fechazarpe_ordentrabajo, fechaarribo_ordentrabajo, areacaptura_ordentrabajo, metodopesca_ordentrabajo, nombreespanol_pais, matricula_proveedor, capacidad_proveedor, 
                         Id_Item_defecto, nombre_defecto_pt, descrpcion_defecto_pt, tipo_defecto_pt, id_nivel_defecto, nombre_nivel_defecto, codigo_lata, Unidades_Cajas, Unidades_Cluster, Peso_Neto, Peso_Drenado, 
                         Nombre_Cliente_det_ing, Numero_Secu_Op, Codigo_Items, fechadescarga_ordentrabajo, NumDeRegistroComprobante, CodRegCapturaDePesca, bloqueo_exportacion, IdGuiaEgresoE1, id_especie, sub_partida, 
                         Kg_Nt, Mes_Ingreso_Bodega, Anio_Ingreso_Bodega, tipo_mov, Nombre_Items_Tipo_Envase, nombre_marca, Numero_Lote, Fecha_Expiracion_Lata, areafao_ordentrabajo, unidades, 
                         ISNULL(unidades_separdas, 0) AS unidades_separdas, ISNULL(unidades_despachadas, 0) AS unidades_despachadas, unidades - ISNULL(unidades_despachadas, 0) AS saldo, nombre_marca_ingreso, 
                         fecha_expiracion, Id_Items_Tipos, origen_proveedor, (unidades - ISNULL(unidades_despachadas, 0)) * kg AS kg_saldo_neto, dia_cuarentena, curentena, CodigoErp, NombreProductoMP, 
                         ISNULL((unidades - ISNULL(unidades_despachadas, 0)) * kg * PrecioKgPt, 0) AS Costo, ubicacion_detalle, Camara, Fila, Columna, Nivel, Recibido, Sticker, Carton, Etiquetas, Destino, id_op, 
                         Id_Items_Liq_Cobertura
FROM            dbo.ProTerm_Ingresos_C1
WHERE        (unidades - ISNULL(unidades_despachadas, 0) > 0)