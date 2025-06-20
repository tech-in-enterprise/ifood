import React, { useEffect, useState } from 'react'
import SideBar from './components/side-bar/side-bar'
import SuperiorBar from './components/superior-bar/superior-bar'
import { useDispatch, useSelector } from 'react-redux'
import { getStoresByEntityId, selectStores } from './redux/slice/store-slice'
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip, Box, Typography, Modal, Paper, Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DataObjectIcon from '@mui/icons-material/DataObject'
import CodeIcon from '@mui/icons-material/Code'
import Checkbox from '@mui/material/Checkbox'
import defaultConfig from './configs/default-json'
import defaultTEFConfig from './configs/default-tef-json'
import AddCircleIcon from '@mui/icons-material/AddCircle'


export default function App() {
  const dispatch = useDispatch()
  const stores = useSelector(selectStores)

  const [activeEntity, setActiveEntity] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [updatedConfig, setUpdatedConfig] = useState(null)
  const [openTefModal, setOpenTefModal] = useState(false)
  const [tefConfig, setTefConfig] = useState(null)
  const [checkedRows, setCheckedRows] = useState([])

  // Sempre que trocar entidade, buscar as lojas daquela entidade
  useEffect(() => {
    if (activeEntity) {
      dispatch(getStoresByEntityId(activeEntity.id))
    }
  }, [activeEntity, dispatch])

  //abrir modal de json
  const handleOpenModal = (store) => {
    const updated = {
      ...defaultConfig,
      STORE_NAME: store.name,
      PARTNER_ESTABLISHMENT_CODE: store.store_id_gcom,
    }
    setUpdatedConfig(updated)
    setOpenModal(true)
  }

  // fechar modal de json
  const handleCloseModal = () => {
    setOpenModal(false)
    setUpdatedConfig(null)
  }

  // Função para abrir o modal de "Gerar código TEF"
  const handleOpenTefModal = (store) => {
    const updatedTefConfig = {
      ...defaultTEFConfig,
      CUSTOMER_CNPJ: store.cnpj,
      TERMINAL_LOJA: store.terminal_store,
      TERMINAL_PDV: store.terminal_pdv,
    }
    setTefConfig(updatedTefConfig)
    setOpenTefModal(true)
  }

  // Função para fechar o modal de "Gerar código TEF"
  const handleCloseTefModal = () => {
    setOpenTefModal(false)
    setTefConfig(null)
  }

  // Marcar/desmarcar checkbox e reorganizar a lista
  const handleCheckboxChange = (storeId) => {
    setCheckedRows((prev) => {
      const isChecked = prev.includes(storeId)
      return isChecked ? prev.filter((id) => id !== storeId) : [...prev, storeId]
    })
  }

  // Reorganizar a lista: marcados no final
  const sortedStores = [
    ...stores.filter((store) => !checkedRows.includes(store.id)),
    ...stores.filter((store) => checkedRows.includes(store.id)),
  ]

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Passa para o SideBar o activeEntity e o setter */}
      <SideBar activeItem={activeEntity} onMenuItemClick={setActiveEntity} />

      {/* Conteúdo Principal */}
      <Box sx={{ flexGrow: 1 }}>
        <SuperiorBar />

        <Box sx={{ padding: 2 }}>
          {activeEntity ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {activeEntity.name}
              </Typography>

              <Table size="small" sx={{ mt: 2, border: '1px solid #ccc', position: 'relative' }}>
                <TableHead >
                  <TableRow sx={{ background: '#101F33' }}>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px', borderLeft: 'solid 1px #000000' }}> Status</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>Nome da Loja</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>CNPJ</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>ID MRC</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>Store ID (GCOM)</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>Menu Token</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>Terminal Loja</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px' }}>Terminal PDV</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFF', textAlign: 'center', border: 'solid 1px', borderRight: 'solid 1px #000000' }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {sortedStores.map((store) => (
                    <TableRow key={store.id} sx={{ background: '#FFF' }}>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px' }}> <Tooltip title={checkedRows.includes(store.id) ? 'Feito' : ''} arrow>
                        <Checkbox size="small" checked={checkedRows.includes(store.id)} onChange={() => handleCheckboxChange(store.id)} />
                      </Tooltip></TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.name}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.cnpj}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.idmrc}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.store_id_gcom}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.menu_token}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.terminal_store}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px', textDecoration: checkedRows.includes(store.id) ? 'line-through' : 'none' }}>{store.terminal_pdv}</TableCell>
                      <TableCell sx={{ textAlign: 'center', border: 'solid 1px' }}>
                        <Tooltip title="Gerar json">
                          <IconButton onClick={() => handleOpenModal(store)}>
                            <DataObjectIcon style={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Gerar código TEF">
                          <IconButton onClick={() => handleOpenTefModal(store)}>
                            <CodeIcon style={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar loja">
                          <IconButton>
                            <BorderColorIcon style={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar Loja">
                          <IconButton>
                            <DeleteForeverIcon style={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Tooltip title="Adicionar loja">
                <IconButton sx={{ position: 'absolute', right: 20, bottom: 20 }}>
                  <AddCircleIcon sx={{ fontSize: '35px' }} />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant='contained'> Criar grupo de loja </Button>
            </Box>
          )}
        </Box>
      </Box>
      {/* Modal para exibir JSON */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90%', overflow: 'auto', maxHeight: '80vh', padding: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Parâmetros da Loja
          </Typography>
          <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
            {updatedConfig && JSON.stringify(updatedConfig, null, 2)}
          </pre>

        </Paper>
      </Modal>

      {/* Modal para "Gerar código TEF" */}
      <Modal open={openTefModal} onClose={handleCloseTefModal}>
        <Paper
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90%', overflow: 'auto', maxHeight: '80vh', padding: 5, }} >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Código TEF - Parâmetros da Loja
          </Typography>
          <pre
            style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem', }} >
            {tefConfig && JSON.stringify(tefConfig, null, 2)}
          </pre>
        </Paper>
      </Modal>

    </Box>
  )
}
