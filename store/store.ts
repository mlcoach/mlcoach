import create from 'zustand/vanilla'
import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	addEdge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	applyNodeChanges,
	applyEdgeChanges,
} from 'react-flow-renderer'
import initialNodes from './nodes'
import MathNode from '../components/Nodes/MathNode'
import StartNode from '../components/Nodes/TestNode'
import variableInput from '../components/Nodes/MathNode/variableInput'
import FileUpload from '../components/Nodes/FileUpload'
import FilterNode from '../components/Nodes/FilterNode'

const nodeTypes = {
	mathNode: MathNode,
	variableInput: variableInput,
	fileUpload: FileUpload,
	filterNode: FilterNode,
	startNode: StartNode,
}

type RFState = {
	modalOpen: boolean
	nodes: Node[]
	edges: Edge[]
	globalNodeStates: any[]
	nodeTypes: any
	fileMap: {}
	setNodes: (node: Node) => void
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
	onNodesDelete: any
	onPaneClick: any
	onNodeClick: any
	storeFile: any
	clickedNode: any
	handleModal: any
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions

const store = create<RFState>((set, get) => ({
	modalOpen: false,
	nodes: initialNodes,
	edges: [],
	nodeTypes: nodeTypes,
	globalNodeStates: [],
	fileMap: {},
	clickedNode: -1,
	onPaneClick: (event: React.MouseEvent) => {
		set({
			//panele tıkladığında clicked node -1 yapıyor.
			clickedNode: -1,
		})
	},
	onNodeClick: (event: React.MouseEvent, node: Node) => {
		set({
			clickedNode: node.id,
		})
	},
	setNodes: (node: Node) => {
		set({
			nodes: [...get().nodes, node],
		})
	},
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		})
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		})
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges),
		})
	},
	storeFile: (nodeId, file: JSON) => {
		get().fileMap[nodeId] = file
	},
	onNodesDelete: changes => {
		if (get().fileMap.hasOwnProperty(changes[0].id)) {
			delete get().fileMap[changes[0].id]
		}
	},
	handleModal: state => {
		set({
			modalOpen: state,
		})
	},
}))

export default store
