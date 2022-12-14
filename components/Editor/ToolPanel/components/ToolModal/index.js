import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import ToolPanel from '../..'

export default function ToolModal({ open, handleModal }) {
	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={open}
			onClose={() => handleModal(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={open}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '60%',
						height: '80%',
						minWidth: '300px',
						minHeight: '300px',
						bgcolor: '#222138',
						color: 'primary.contrastText',
						p: 4,
						outline: 'none',
						borderRadius: '10px',
					}}>
					<ToolPanel />
				</Box>
			</Fade>
		</Modal>
	)
}
