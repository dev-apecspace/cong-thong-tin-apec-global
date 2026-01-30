import { supabase } from './supabase'
import type { SiteConfiguration, CMSProject, CMSModule, CompanyOverviewBlock } from './types'

export async function getSiteConfiguration(): Promise<SiteConfiguration | null> {
  if (!supabase) {
    console.warn('Supabase client is not initialized. Falling back to static data.')
    return null
  }
  try {
    // 1. Fetch Company Config
    const { data: configData, error: configError } = await supabase
      .from('company_config')
      .select('*')
      .single()

    if (configError) throw configError

    // 2. Fetch Overview Blocks
    const { data: blocksData, error: blocksError } = await supabase
      .from('overview_blocks')
      .select('*')
      .order('display_order', { ascending: true })

    if (blocksError) throw blocksError

    // 3. Fetch Projects
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')

    if (projectsError) throw projectsError

    // 4. Fetch Modules
    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .order('display_order', { ascending: true })

    if (modulesError) throw modulesError

    // 5. Fetch all module project details
    const { data: detailsData, error: detailsError } = await supabase
      .from('module_project_details')
      .select('*')

    if (detailsError) throw detailsError

    // Process blocks
    const blocks: CompanyOverviewBlock[] = (blocksData || []).map(b => ({
      id: b.block_id,
      title: b.title,
      description: b.description || '',
      icon: b.icon,
      value: b.value,
      order: b.display_order,
      isVisible: b.is_visible
    }))

    // Process projects
    const allProjects: CMSProject[] = (projectsData || [])
        .filter(p => p.id !== 'default')
        .map(p => ({
            id: p.id,
            name: p.name,
            logo: p.logo
        }))

    // Process modules
    const modules: CMSModule[] = (modulesData || []).map(m => {
      const moduleDetails: Record<string, any> = {}
      
      // Filter details for this module
      const moduleSpecificDetails = (detailsData || []).filter(d => d.module_id === m.id)
      const defaultDetail = moduleSpecificDetails.find(d => d.project_id === 'default')?.content || {}

      allProjects.forEach(p => {
        const detail = moduleSpecificDetails.find(d => d.project_id === p.id)
        moduleDetails[p.name] = detail ? detail.content : defaultDetail
      })

      return {
        id: m.id,
        title: m.title,
        description: m.description,
        icon: m.icon,
        order: m.display_order,
        isVisible: m.is_visible,
        route: m.route,
        backgroundImage: m.background_image,
        color: m.color,
        textColor: m.text_color,
        textColorHover: m.text_color_hover,
        projects: allProjects,
        details: moduleDetails
      }
    })

    return {
      projects: allProjects,
      company: {
        name: configData.name,
        logo: configData.logo,
        logoAlt: configData.logo_alt,
        slogan: configData.slogan,
        shortName: configData.short_name,
        brandName: configData.brand_name
      },
      header: {
        sticky: configData.header_sticky,
        bgColor: configData.header_bg_color
      },
      overviewSection: {
        title: 'TỔNG QUAN TẬP ĐOÀN', // Can be hardcoded or added to config table
        description: 'KHÁM PHÁ NHỮNG THÔNG TIN CƠ BẢN VỀ TẬP ĐOÀN',
        blocks: blocks
      },
      moduleNavigation: {
        title: 'TRUNG TÂM THÔNG TIN',
        description: 'CHỌN MỘT DỊCH VỤ ĐỂ XEM CHI TIẾT',
        modules: modules
      },
      footer: {
        videoUrl: configData.footer_video_url,
        videoTitle: configData.footer_video_title,
        copyright: configData.footer_copyright
      }
    }
  } catch (error) {
    console.error('Error fetching site configuration:', error)
    return null
  }
}
