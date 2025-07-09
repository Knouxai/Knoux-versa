import { useRef, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Download, RotateCcw, Square, Circle as CircleIcon, Edit3, MousePointer, Trash2 } from 'lucide-react';
import { Canvas, Circle as FabricCircle, Rect as FabricRect, FabricImage, FabricObject } from 'fabric';
import { useLanguage } from '@/hooks/useLanguage';

interface AdvancedImageCanvasProps {
  onImageUpload: (imageUrl: string) => void;
  onSelectionChange: (selectionData: string) => void;
  uploadedImage: string | null;
}

interface SelectionData {
  type: 'rectangle' | 'circle' | 'polygon' | 'freehand';
  coordinates: any;
  bounds: { x: number; y: number; width: number; height: number };
  canvasWidth: number;
  canvasHeight: number;
}

export function AdvancedImageCanvas({ onImageUpload, onSelectionChange, uploadedImage }: AdvancedImageCanvasProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectionTool, setSelectionTool] = useState<'select' | 'rectangle' | 'circle' | 'freehand'>('select');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<FabricObject | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  // Initialize fabric canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f8f9fa',
        selection: selectionTool === 'select'
      });

      // Configure drawing settings
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = 3;
        canvas.freeDrawingBrush.color = '#3b82f6';
      }

      fabricCanvasRef.current = canvas;

      // Handle selection events
      canvas.on('selection:created', (e: any) => {
        setCurrentSelection(e.selected?.[0] || null);
        updateSelectionData(e.selected?.[0]);
      });

      canvas.on('selection:updated', (e: any) => {
        setCurrentSelection(e.selected?.[0] || null);
        updateSelectionData(e.selected?.[0]);
      });

      canvas.on('selection:cleared', () => {
        setCurrentSelection(null);
        onSelectionChange('');
      });

      canvas.on('path:created', (e: any) => {
        if (selectionTool === 'freehand') {
          updateSelectionData(e.path);
        }
      });
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  // Update canvas mode based on selected tool
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.selection = selectionTool === 'select';
    canvas.isDrawingMode = selectionTool === 'freehand';
    setIsDrawingMode(selectionTool === 'freehand');

    // Remove event listeners first
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    if (selectionTool === 'rectangle') {
      setupRectangleDrawing(canvas);
    } else if (selectionTool === 'circle') {
      setupCircleDrawing(canvas);
    }
  }, [selectionTool]);

  const setupRectangleDrawing = (canvas: Canvas) => {
    let isDown = false;
    let origX = 0;
    let origY = 0;
    let rectangle: FabricRect | null = null;

    canvas.on('mouse:down', (o: any) => {
      if (selectionTool !== 'rectangle') return;
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      
      rectangle = new FabricRect({
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        fill: 'rgba(59, 130, 246, 0.3)',
        stroke: '#3b82f6',
        strokeWidth: 2,
        selectable: true,
        evented: true,
      });
      
      canvas.add(rectangle);
    });

    canvas.on('mouse:move', (o: any) => {
      if (!isDown || !rectangle || selectionTool !== 'rectangle') return;
      const pointer = canvas.getPointer(o.e);
      
      const width = Math.abs(pointer.x - origX);
      const height = Math.abs(pointer.y - origY);
      
      rectangle.set({
        width: width,
        height: height,
        left: pointer.x < origX ? pointer.x : origX,
        top: pointer.y < origY ? pointer.y : origY,
      });
      
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      if (rectangle && selectionTool === 'rectangle') {
        isDown = false;
        canvas.setActiveObject(rectangle);
        updateSelectionData(rectangle);
        setCurrentSelection(rectangle);
      }
    });
  };

  const setupCircleDrawing = (canvas: Canvas) => {
    let isDown = false;
    let origX = 0;
    let origY = 0;
    let circle: FabricCircle | null = null;

    canvas.on('mouse:down', (o: any) => {
      if (selectionTool !== 'circle') return;
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      
      circle = new FabricCircle({
        left: origX,
        top: origY,
        originX: 'center',
        originY: 'center',
        radius: 0,
        fill: 'rgba(59, 130, 246, 0.3)',
        stroke: '#3b82f6',
        strokeWidth: 2,
        selectable: true,
        evented: true,
      });
      
      canvas.add(circle);
    });

    canvas.on('mouse:move', (o: any) => {
      if (!isDown || !circle || selectionTool !== 'circle') return;
      const pointer = canvas.getPointer(o.e);
      
      const radius = Math.sqrt(Math.pow(pointer.x - origX, 2) + Math.pow(pointer.y - origY, 2)) / 2;
      circle.set({ radius: radius });
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      if (circle && selectionTool === 'circle') {
        isDown = false;
        canvas.setActiveObject(circle);
        updateSelectionData(circle);
        setCurrentSelection(circle);
      }
    });
  };

  const updateSelectionData = (object: FabricObject | undefined) => {
    if (!object || !fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const bounds = object.getBoundingRect();
    
    let selectionData: SelectionData;

    if (object instanceof FabricRect) {
      selectionData = {
        type: 'rectangle',
        coordinates: {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        },
        bounds: {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        },
        canvasWidth: canvas.width || 800,
        canvasHeight: canvas.height || 600
      };
    } else if (object instanceof FabricCircle) {
      selectionData = {
        type: 'circle',
        coordinates: {
          centerX: bounds.left + bounds.width / 2,
          centerY: bounds.top + bounds.height / 2,
          radius: bounds.width / 2
        },
        bounds: {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        },
        canvasWidth: canvas.width || 800,
        canvasHeight: canvas.height || 600
      };
    } else {
      selectionData = {
        type: 'freehand',
        coordinates: object.path || [],
        bounds: {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        },
        canvasWidth: canvas.width || 800,
        canvasHeight: canvas.height || 600
      };
    }

    onSelectionChange(JSON.stringify(selectionData));
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('Please select an image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
      loadImageToCanvas(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const loadImageToCanvas = (imageUrl: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    FabricImage.fromURL(imageUrl, {}).then((img: any) => {
      // Clear canvas
      canvas.clear();
      
      // Scale image to fit canvas while maintaining aspect ratio
      const canvasWidth = 800;
      const canvasHeight = 600;
      const imgWidth = img.width || 1;
      const imgHeight = img.height || 1;
      
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: (canvasWidth - imgWidth * scale) / 2,
        top: (canvasHeight - imgHeight * scale) / 2,
        selectable: false,
        evented: false,
      });
      
      canvas.add(img);
      canvas.renderAll();
      setImageLoaded(true);
    });
  };

  const clearSelection = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      setCurrentSelection(null);
      onSelectionChange('');
    }
  };

  const clearAllSelections = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects().filter((obj: any) => !(obj instanceof FabricImage));
    objects.forEach((obj: any) => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.renderAll();
    setCurrentSelection(null);
    onSelectionChange('');
  };

  // Load uploaded image when prop changes
  useEffect(() => {
    if (uploadedImage) {
      loadImageToCanvas(uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-cyan-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {t('Advanced Canvas')}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('Upload')}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectionTool === 'select' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectionTool('select')}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
          >
            <MousePointer className="h-4 w-4 mr-2" />
            {t('Select')}
          </Button>
          <Button
            variant={selectionTool === 'rectangle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectionTool('rectangle')}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
          >
            <Square className="h-4 w-4 mr-2" />
            {t('Rectangle')}
          </Button>
          <Button
            variant={selectionTool === 'circle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectionTool('circle')}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
          >
            <CircleIcon className="h-4 w-4 mr-2" />
            {t('Circle')}
          </Button>
          <Button
            variant={selectionTool === 'freehand' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectionTool('freehand')}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {t('Freehand')}
          </Button>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border-2 border-cyan-500/30 rounded-lg bg-white/10 backdrop-blur-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <div className="text-center text-white/60">
                <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{t('Upload an image to get started')}</p>
              </div>
            </div>
          )}
        </div>

        {currentSelection && (
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('Clear Selection')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllSelections}
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('Clear All')}
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </Card>
  );
}