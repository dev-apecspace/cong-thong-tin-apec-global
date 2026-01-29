import { createClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/capabilities?project_id=xxx
 * Lấy danh sách capabilities của một project
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    const moduleId = searchParams.get('module_id') || 'capabilities';

    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing required parameter: project_id' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('module_project_details')
      .select('content')
      .eq('module_id', moduleId)
      .eq('project_id', projectId)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch capabilities' },
        { status: 500 }
      );
    }

    const content = data?.content as any;
    const capabilityItems = content?.capabilityItems || [];

    return NextResponse.json({
      success: true,
      data: capabilityItems,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/capabilities
 * Cập nhật danh sách capabilities
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, moduleId = 'capabilities', capabilityItems, achievements, experience } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing required field: projectId' },
        { status: 400 }
      );
    }

    if (!capabilityItems || !Array.isArray(capabilityItems)) {
      return NextResponse.json(
        { error: 'Invalid capabilityItems: must be an array' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Lấy content hiện tại
    const { data: currentData } = await supabase
      .from('module_project_details')
      .select('content')
      .eq('module_id', moduleId)
      .eq('project_id', projectId)
      .single();

    const currentContent = currentData?.content as any || {};

    // Cập nhật với dữ liệu mới
    const newContent = {
      ...currentContent,
      capabilityItems,
      achievements: achievements || currentContent.achievements || [],
      experience: experience || currentContent.experience || '',
    };

    const { error } = await supabase
      .from('module_project_details')
      .upsert(
        {
          module_id: moduleId,
          project_id: projectId,
          content: newContent,
        },
        { onConflict: 'module_id,project_id' }
      );

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update capabilities' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Capabilities updated successfully',
      data: newContent,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/capabilities/:id
 * Cập nhật một capability item cụ thể
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, moduleId = 'capabilities', index, item } = body;

    if (!projectId || index === undefined || !item) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, index, item' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: currentData } = await supabase
      .from('module_project_details')
      .select('content')
      .eq('module_id', moduleId)
      .eq('project_id', projectId)
      .single();

    if (!currentData) {
      return NextResponse.json(
        { error: 'Module project details not found' },
        { status: 404 }
      );
    }

    const currentContent = currentData.content as any;
    const capabilityItems = currentContent.capabilityItems || [];

    if (index < 0 || index >= capabilityItems.length) {
      return NextResponse.json(
        { error: 'Invalid index' },
        { status: 400 }
      );
    }

    capabilityItems[index] = item;

    const newContent = {
      ...currentContent,
      capabilityItems,
    };

    const { error } = await supabase
      .from('module_project_details')
      .update({ content: newContent })
      .eq('module_id', moduleId)
      .eq('project_id', projectId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update capability' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Capability updated successfully',
      data: newContent,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/capabilities/:id
 * Xóa một capability item
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    const moduleId = searchParams.get('module_id') || 'capabilities';
    const index = parseInt(searchParams.get('index') || '-1');

    if (!projectId || index < 0) {
      return NextResponse.json(
        { error: 'Missing or invalid parameters' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: currentData } = await supabase
      .from('module_project_details')
      .select('content')
      .eq('module_id', moduleId)
      .eq('project_id', projectId)
      .single();

    if (!currentData) {
      return NextResponse.json(
        { error: 'Module project details not found' },
        { status: 404 }
      );
    }

    const currentContent = currentData.content as any;
    const capabilityItems = currentContent.capabilityItems || [];

    if (index >= capabilityItems.length) {
      return NextResponse.json(
        { error: 'Invalid index' },
        { status: 400 }
      );
    }

    capabilityItems.splice(index, 1);

    const newContent = {
      ...currentContent,
      capabilityItems,
    };

    const { error } = await supabase
      .from('module_project_details')
      .update({ content: newContent })
      .eq('module_id', moduleId)
      .eq('project_id', projectId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete capability' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Capability deleted successfully',
      data: newContent,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
