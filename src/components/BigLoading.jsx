export default function BigLoading({message}){
    message="페이지 전체"
    return (
        <div className="w-full h-full">
            <div className="absolute top-[10rem] max-h-0.5 max-w-0.5 left-1/2 right-1/2 inset-0 rounded-full bg-gradient-to-r from-red-500
            via-yellow-400 via-green-400 via-blue-400 to-purple-500 animate-spin"></div>
            <div className="absolute top-[10rem] max-h-0.5 max-w-0.5 left-1/2 right-1/2 inset-1 rounded-full bg-purple-300/10"></div>
            <span className="text-bold text-blue-500 text-4xl font-mono mt-2">{message} 로딩 중...</span>
        </div>
    )
}