import { useState } from 'react';

interface RecipeFormProps {
  initialTitle: string; // Initial title of the recipe
  initialIngredients: string[]; // Initial list of ingredients
  initialInstructions: string[]; // Initial list of instructions
  initialTags?: string[]; // Optional initial list of tags
  onSubmit: (
    title: string, // Title input from the user
    ingredients: string[], // Ingredients input from the user
    instructions: string[], // Instructions input from the user
    tags: string[] // Tags input from the user
  ) => void;
  showTags?: boolean; // Optional flag to show or hide tags input
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialTitle,
  initialIngredients,
  initialInstructions,
  initialTags = [],
  onSubmit,
  showTags = true,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [tags, setTags] = useState(initialTags);
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients((prev) => [...prev, newIngredient]);
      setNewIngredient('');
    }
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions((prev) => [...prev, newInstruction]);
      setNewInstruction('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      // Prevent duplicate tags
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = () => {
    if (title.trim() && ingredients.length > 0 && instructions.length > 0) {
      // Ensure title, ingredients, and instructions are filled
      onSubmit(title, ingredients, instructions, tags);
    } else {
      // Handle validation errors (e.g., show an alert or error message)
      alert('모든 필드를 채워주세요(태그는 선택사항)');
    }
  };

  return (
    <div className='bg-white rounded-lg p-6'>
      <div className='mb-6'>
        <h3 className='text-xl font-semibold'>레시피 제목</h3>
        <div className='mb-2 mt-2'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='레시피 제목을 입력하세요'
            className='border border-gray-300 px-4 py-2 rounded w-full '
          />
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-xl font-semibold'>재료 목록</h3>
        <div className='flex justify-between mb-2 mt-2'>
          <input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder='재료를 입력하세요'
            className='border border-gray-300 px-4 py-2 rounded w-4/5 '
          />
          <button
            className='bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition w-auto'
            onClick={handleAddIngredient}
          >
            추가
          </button>
        </div>
        <ul className='mb-2'>
          {ingredients.map((ingredient, index) => (
            <li key={index} className='flex justify-between items-center'>
              <span>{ingredient}</span>
              <button
                className='text-green-500 hover:underline'
                onClick={() =>
                  setIngredients((prev) => prev.filter((_, i) => i !== index))
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-6'>
        <h3 className='text-xl font-semibold'>조리 과정</h3>
        <div className='flex justify-between mb-2 mt-2'>
          <input
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            placeholder='조리 과정을 입력하세요'
            className='border border-gray-300 px-4 py-2 rounded w-4/5 '
          />
          <button
            className='bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition w-auto'
            onClick={handleAddInstruction}
          >
            추가
          </button>
        </div>
        <ul className='mb-2'>
          {instructions.map((instruction, index) => (
            <li key={index} className='flex justify-between items-center'>
              <span>{instruction}</span>
              <button
                className='text-green-500 hover:underline'
                onClick={() =>
                  setInstructions((prev) => prev.filter((_, i) => i !== index))
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showTags && (
        <div className='mb-6'>
          <h3 className='text-xl font-semibold'>태그 목록</h3>
          <div className='flex justify-between mb-2 mt-2 '>
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder='태그를 입력하세요'
              className='border border-gray-300 px-4 py-2 rounded w-4/5 '
            />
            <button
              className='bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition w-auto'
              onClick={handleAddTag}
            >
              추가
            </button>
          </div>
          <div className='flex flex-wrap gap-2 mb-2'>
            {tags.map((tag, index) => (
              <span
                key={index}
                className='bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center'
              >
                #{tag}
                <button
                  className='text-red-500 ml-2'
                  onClick={() => handleTagDelete(tag)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className='bg-green-500 text-white px-6 py-3 rounded w-full hover:bg-green-600 transition '
      >
        저장하기
      </button>
    </div>
  );
};

export default RecipeForm;
